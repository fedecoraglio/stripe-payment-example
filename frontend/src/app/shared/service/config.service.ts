import { Inject, Injectable, InjectionToken } from '@angular/core';
import { EnvironmentConfig } from '../../../environments/environment-config';

export const environmentConfig = new InjectionToken<EnvironmentConfig>(
  'environment-config',
);

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(
    @Inject(environmentConfig) readonly environment: EnvironmentConfig,
  ) {}
}
