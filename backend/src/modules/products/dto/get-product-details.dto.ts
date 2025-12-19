import { IsNotEmpty, IsString } from 'class-validator';

export class GetProductDetailsDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}