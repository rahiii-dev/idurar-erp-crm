import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { env, envChecker } from './config/env';
import { ReportsModule } from './modules/reports/reports.module';
import { WebhookModule } from './modules/webhook/webhook.module';

envChecker(['DATABASE']);

@Module({
  imports: [
    MongooseModule.forRoot(env('DATABASE')),
    ReportsModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
