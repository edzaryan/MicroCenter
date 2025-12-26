import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import products from './data/products.json';
import { Product } from '../modules/products/schemas/product.schema';
import { generateSlug } from '@/utils/slug.util';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async run() {
    try {
      console.log('🌱 Seeding started…');

      const preparedProducts = products.map((p) => ({
        ...p,
        slug: generateSlug(p.productName),
      }));

      console.log(`📦 Preparing ${preparedProducts.length} products…`);

      await this.productModel.insertMany(preparedProducts);

      console.log('✅ Products successfully seeded!');
    } catch (error) {
      console.error('❌ Error while seeding products:', error);
    }
  }
}
