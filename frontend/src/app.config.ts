import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { StripeService } from './app/shared/service/stripe.service';
import { environmentConfig } from './app/shared/service/config.service';
import { environment } from './environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withJsonpSupport()),
    {
      provide: environmentConfig,
      useValue: environment,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (stripeService: StripeService) => async () =>
        await stripeService.init(),
      deps: [StripeService],
      multi: true,
    },
  ],
};
