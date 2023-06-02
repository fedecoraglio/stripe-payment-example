import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ProductModule } from '../products/product.module';
import { AppConfigModule } from '../config/app-config.module';


@Module({
  imports: [ProductModule, AppConfigModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
