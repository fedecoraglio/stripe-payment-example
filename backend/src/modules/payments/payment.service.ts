import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { ProductService } from '../products/product.service';
import { CreateSessionPaymentDto } from './dto/create-session-payment.dto';
import { AppConfigService } from '../config/app-config.service';

@Injectable()
export class PaymentService {
  private stripe = new Stripe(this.appConfigService.stripeApiKey, {
    apiVersion: '2022-11-15',
  });

  constructor(
    private readonly productService: ProductService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async createSessionPayment(dto: CreateSessionPaymentDto): Promise<string> {
    if (!dto || !dto.productId || !dto.quantity) {
      throw new HttpException(
        `You must provide id and quantity product`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const product = this.productService.getProductById(
      parseInt(dto?.productId, 10),
    );
    if (!dto || !product) {
      throw new HttpException(
        `Product ${dto?.productId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const sessionData = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price,
          },
          quantity: parseInt(dto.quantity, 10),
        },
      ],
      success_url: this.appConfigService.stripeSuccessFrontUrl,
      cancel_url: this.appConfigService.stripeCancelationFrontUrl,
    });
    return sessionData.id;
  }
}
