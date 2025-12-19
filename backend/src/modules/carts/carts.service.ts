import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { Product } from '../products/schemas/product.schema';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async addToCart(userId: string, productId: string) {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    const exists = await this.cartModel.findOne({ userId, productId });
    if (exists) throw new BadRequestException('Already exists in the cart');

    const created = await this.cartModel.create({
      userId,
      productId,
      quantity: 1,
    });

    return {
      message: 'Product added to cart',
      success: true,
      error: false,
      data: created,
    };
  }

  async getCartProducts(userId: string) {
    const items = await this.cartModel.find({ userId }).populate('productId');

    return {
      success: true,
      error: false,
      data: items,
    };
  }

  async countCartItems(userId: string) {
    const count = await this.cartModel.countDocuments({ userId });

    return {
      message: 'ok',
      success: true,
      error: false,
      data: { count },
    };
  }

  async updateCartProduct(id: string, quantity: number) {
    const updated = await this.cartModel.updateOne({ _id: id }, { quantity });

    return {
      message: 'Product updated successfully',
      success: true,
      error: false,
      data: updated,
    };
  }

  async deleteCartProduct(id: string): Promise<any> {
    const deleted = await this.cartModel.deleteOne({ _id: id });

    return {
      message: 'Product deleted from cart',
      success: true,
      error: false,
      data: deleted,
    };
  }
}
