import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class StripeService {
  private stripe = null;

  constructor(private readonly configService: ConfigService) {}

  async init() {
    console.log('[StripeService] - init');
    this.stripe = await loadStripe(this.configService.environment.stripePublicApiKey);
    console.log('[StripeService] - end');
  }

  getStripe() {
    return this.stripe;
  }
}
