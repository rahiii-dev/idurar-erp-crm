import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WebhookPayload extends Document {
  @Prop({ required: true }) source: string;

  @Prop({ type: Object, required: true }) data: Record<string, any>;
}

export const WebhookPayloadSchema = SchemaFactory.createForClass(WebhookPayload);
