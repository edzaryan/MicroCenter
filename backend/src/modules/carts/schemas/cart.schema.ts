import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  productId: string;

  @Prop()
  quantity: number;

  @Prop()
  userId: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

