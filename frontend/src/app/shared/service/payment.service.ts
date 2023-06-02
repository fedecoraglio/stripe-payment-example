import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { PaymentApiService } from './api/payment-api.service';
import { CreateSessionPaymentDto } from '../dto/create-session-payment.dto';
import { SessionPaymentDto } from '../dto/session-payment.dto';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly paymentApiService = inject(PaymentApiService);
  private readonly _sessionPayment$ = new BehaviorSubject<SessionPaymentDto>(
    null,
  );
  readonly sessionPayment$ = this._sessionPayment$.asObservable();
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this._isLoading$.asObservable();

  createPaymentSession$(
    dto: CreateSessionPaymentDto,
  ): Observable<SessionPaymentDto> {
    this._isLoading$.next(true);
    return this.paymentApiService.createPaymentSession(dto).pipe(
      tap((sessionId) => {
        this._sessionPayment$.next(sessionId);
        this._isLoading$.next(false);
      }),
    );
  }
}
