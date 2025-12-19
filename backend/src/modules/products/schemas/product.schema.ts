import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop()
  productName: string;

  @Prop()
  brandName: string;

  @Prop()
  category: string;

  @Prop({ type: [String], default: [] })
  productImage: string[];

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  sellingPrice: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
