import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WebhookPayload } from './schemas/webhook.schema';
import { Model } from 'mongoose';
import { CreateWebhookDto } from './dto/create-webhook.dto';

@Injectable()
export class WebhookService {
    constructor(
        @InjectModel(WebhookPayload.name)
        private webhookModel: Model<WebhookPayload>,
    ) { }

    async handleWebhook(body: CreateWebhookDto) {
        const { source, data } = body;

        const saved = await this.webhookModel.create({ source, data });

        return {
            message: 'Webhook received and stored successfully',
            id: saved._id,
        };
    }
}
