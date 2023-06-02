import { Body, Controller, Get, Post } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { CreateSessionPaymentDto } from './dto/create-session-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/sessions')
  async createPaymentSession(
    @Body() dto: CreateSessionPaymentDto,
  ): Promise<{ sessionId: string }> {
    const sessionId = await this.paymentService.createSessionPayment(dto);
    return { sessionId };
  }
}
