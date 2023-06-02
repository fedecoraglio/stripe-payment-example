import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Stripe } from 'stripe';

import { PaymentService } from '../shared/service/payment.service';
import { ProductService } from '../shared/service/product.service';
import { StripeService } from '../shared/service/stripe.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  private readonly paymentService = inject(PaymentService);
  private readonly productService = inject(ProductService);
  private readonly stripeService = inject(StripeService);
  private readonly createPaymentSession$ = new Subject<boolean>();
  private readonly onDestroy$ = new Subject<void>();
  private readonly sessionPayment$ = this.paymentService.sessionPayment$;
  readonly waitPayment$ = this.paymentService.isLoading$;
  readonly products$ = this.productService.products$;
  readonly paymentGroup = new FormGroup({
    product: new FormControl(null, Validators.required),
    quantity: new FormControl(null, Validators.required),
  });

  ngOnInit() {
    this.productService
      .getAll$()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();

    this.createPaymentSession$
      .pipe(
        switchMap(() => {
          const { product, quantity } = this.paymentGroup.getRawValue();
          return this.paymentService.createPaymentSession$({
            productId: product.id,
            quantity,
          });
        }),
        takeUntil(this.onDestroy$),
      )
      .subscribe();

    this.sessionPayment$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((sessionPayment) => {
        if (sessionPayment) {
          this.stripeService.getStripe().redirectToCheckout({
            sessionId: sessionPayment.sessionId,
          });
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  handlerCheckoutClick() {
    this.createPaymentSession$.next(true);
  }
}
