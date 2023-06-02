import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { PaymentModule } from './modules/payments/payment.module';
import { ProductModule } from './modules/products/product.module';
import { AppConfigModule } from './modules/config/app-config.module';

@Module({
  imports: [PaymentModule, ProductModule, AppConfigModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
