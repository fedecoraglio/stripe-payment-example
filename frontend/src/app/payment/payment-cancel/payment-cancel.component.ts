import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.css'],
})
export class PaymentCancelComponent {}
