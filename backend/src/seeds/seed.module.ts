import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { SeedService } from './seed.service';
import { User, UserSchema } from '../modules/users/schemas/user.schema';
import { Product, ProductSchema } from '../modules/products/schemas/product.schema';
import { Cart, CartSchema } from '../modules/carts/schemas/cart.schema';
import { CleanService } from './clean.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URL'),
      }),
    }),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Cart.name, schema: CartSchema },
    ]),
  ],
  providers: [SeedService, CleanService],
})
export class SeedModule {}
