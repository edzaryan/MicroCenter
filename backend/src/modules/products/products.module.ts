import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { User, UserSchema } from '../users/schemas/user.schema';
import { ProductPermission } from './helpers/permission';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductPermission],
  exports: [ProductsService],
})
export class ProductsModule {}
