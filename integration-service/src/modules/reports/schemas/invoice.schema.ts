import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class InvoiceItem {
  @Prop({ required: true }) itemName: string;
  @Prop() description?: string;
  @Prop({ required: true }) quantity: number;
  @Prop({ required: true }) price: number;
  @Prop({ required: true }) total: number;
}

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop() removed: boolean;
  @Prop() createdBy: string;
  @Prop() number: number;
  @Prop() year: number;
  @Prop() content?: string;
  @Prop() recurring?: string;
  @Prop({ required: true }) date: Date;
  @Prop({ required: true }) expiredDate: Date;
  @Prop({ required: true }) client: string;
  @Prop() items: InvoiceItem[];
  @Prop() subTotal: number;
  @Prop() total: number;
  @Prop() taxTotal: number;
  @Prop() taxRate: number;
  @Prop() currency: string;
  @Prop() paymentStatus: string;
  @Prop() status: string;
  @Prop() updated?: Date;
  @Prop() created?: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
