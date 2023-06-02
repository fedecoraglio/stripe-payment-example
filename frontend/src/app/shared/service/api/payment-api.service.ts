import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateSessionPaymentDto } from '../../dto/create-session-payment.dto';
import { SessionPaymentDto } from '../../dto/session-payment.dto';

@Injectable({ providedIn: 'root' })
export class PaymentApiService {
  private readonly http = inject(HttpClient);
  private basePath = 'v1/payments';

  createPaymentSession(
    dto: CreateSessionPaymentDto,
  ): Observable<SessionPaymentDto> {
    return this.http.post<SessionPaymentDto>(`${this.basePath}/sessions`, {
      ...dto,
    });
  }
}
