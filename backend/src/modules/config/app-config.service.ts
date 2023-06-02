import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

export const appConfigSchemaValidation = Joi.object({
  STRIPE_API_KEY: Joi.string().required(),
  PORT: Joi.string().required().default(4560),
  STRIPE_SUCCESS_FRONT_URL: Joi.string().required(),
  STRIPE_CANCELLATION_FRONT_URL: Joi.string().required(),
});

@Injectable()
export class AppConfigService {
  readonly port: number = this.configService.get<number>('PORT');
  readonly stripeApiKey: string = this.configService.get<string>('STRIPE_API_KEY');
  readonly stripeSuccessFrontUrl: string = this.configService.get<string>(
    'STRIPE_SUCCESS_FRONT_URL',
  );
  readonly stripeCancelationFrontUrl: string = this.configService.get<string>(
    'STRIPE_CANCELLATION_FRONT_URL',
  );
  constructor(private readonly configService: ConfigService) {}
}
