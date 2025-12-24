import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {

  @Prop({ type: String, required: true }) 
  productName: string;

  @Prop({ type: String, required: true })
  brandName: string;

  @Prop({ type: String, required: true, index: true }) 
  productType: string;

  @Prop({ type: [String], default: [] })
  productImages: string[];

  @Prop({ type: Number, min: 0, max: 5, default: 0 })
  rating: number;

  @Prop({ type: String, required: true }) 
  description: string;

  @Prop({ type: Number, required: true }) 
  price: number;

  @Prop({ type: Number, required: true })
  sellingPrice: number;

  @Prop({ type: String, required: true, unique: true, index: true })
  slug: string;

  @Prop({ type: Number })
  width: number;

  @Prop({ type: Number })
  height: number;

  @Prop({ type: Number })
  length: number;

  @Prop({ type: Number })
  weight: number;


}

export const ProductSchema = SchemaFactory.createForClass(Product);