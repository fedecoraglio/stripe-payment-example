import { Routes } from '@angular/router';
import { RoutePaths } from './app.routes-path';
import { AppComponent } from './app.component';
import { HomeComponent } from './app/home/home.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutePaths.Payments,
  },
  {
    path: '',
    children: [
      {
        path: RoutePaths.Payments,
        loadChildren: () =>
          import('./app/payment/payment.routes').then(
            ({ paymentRoutes }) => paymentRoutes,
          ),
      },
      {
        path: RoutePaths.PaymentsSuccesses,
        loadChildren: () =>
          import('./app/payment/payment-success/payment-success.routes').then(
            ({ paymentRoutes }) => paymentRoutes,
          ),
      },
      {
        path: RoutePaths.PaymentsCancellation,
        loadChildren: () =>
          import('./app/payment/payment-cancel/payment-cancel.routes').then(
            ({ paymentRoutes }) => paymentRoutes,
          ),
      },
    ],
  },
];
