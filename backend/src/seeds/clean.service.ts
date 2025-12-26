import { Product } from '../modules/products/schemas/product.schema';
import { User } from '../modules/users/schemas/user.schema';
import { Cart } from '../modules/carts/schemas/cart.schema';
import { InjectModel } from '@nestjs/mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CleanService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async cleanDatabase() {
    try {
      await this.cartModel.deleteMany({});
      await this.productModel.deleteMany({});
      await this.userModel.deleteMany({});
    } catch (err) {
      console.error('DATABASE CLEAN ERROR:', err);
    }
  }

  async cleanCloudinary() {
    let nextCursor: string | undefined = undefined;

    try {
      while (true) {
        let result;

        try {
          result = await cloudinary.api.resources({
            resource_type: 'image',
            type: 'upload',
            max_results: 100,
            next_cursor: nextCursor,
          });
        } catch (inner) {
          console.error('Cloudinary API error:', inner);
          break;
        }

        if (!result || !result.resources) {
          console.log('No resources returned. Stopping.');
          break;
        }

        const publicIds = result.resources.map(r => r.public_id);

        if (publicIds.length === 0) {
          console.log('No more images to delete.');
          break;
        }

        try {
          await cloudinary.api.delete_resources(publicIds, {
            resource_type: 'image',
            type: 'upload',
          });
        } catch (delErr) {
          console.error('Delete error:', delErr);
        }

        nextCursor = result.next_cursor;
        if (!nextCursor) break;
      }
    } catch (outer) {
      console.error('UNEXPECTED Cloudinary cleanup error:', outer);
    }

    console.log('Cloudinary cleanup finished.');
  }

  async run() {
    console.log('Removing Cloudinary files...');
    await this.cleanCloudinary();
    console.log('✅ Cloudinary files successfully deleted!');

    console.log('Cleaning the database');
    await this.cleanDatabase();
    console.log('✅ Database data succesfully deleted!');
  }
}
