import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Note {
  @Prop({ required: true }) content: string;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
}

@Schema({ timestamps: true })
export class Query extends Document {
  @Prop() client: string;
  @Prop() description: string;
  @Prop() status: string;
  @Prop() resolution?: string;
  @Prop({ type: [Object] }) notes: Note[];
  @Prop() createdBy: string;
  @Prop() removed: boolean;
}

export const QuerySchema = SchemaFactory.createForClass(Query);
