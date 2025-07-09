import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { WebhookPayload, WebhookPayloadSchema } from './schemas/webhook.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WebhookPayload.name, schema: WebhookPayloadSchema }]),
  ],
  controllers: [WebhookController],
  providers: [WebhookService]
})
export class WebhookModule {}
