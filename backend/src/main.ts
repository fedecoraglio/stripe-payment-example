import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppConfigService } from './modules/config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('v1');
  const appConfigService: AppConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port || 4560);
}
bootstrap();
