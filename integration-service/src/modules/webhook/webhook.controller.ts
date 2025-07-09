import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';

@Controller('webhook')
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) { }

    @Post()
    async receiveWebhook(@Body() body: CreateWebhookDto) {
        return this.webhookService.handleWebhook(body);
    }
}
