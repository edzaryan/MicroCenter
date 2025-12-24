import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  productName: string;

  @IsString()
  brandName: string;

  @IsString()
  productType: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  productImages?: string[];

  @IsString()
  description: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Type(() => Number)
  sellingPrice: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  width?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  height?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  length?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  weight?: number;
}
