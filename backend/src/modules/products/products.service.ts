import { 
  Injectable, 
  BadRequestException, 
  ForbiddenException, 
  NotFoundException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { ProductPermission } from './helpers/permission';
import { CreateProductDto } from './dto/create-product.dto';
import { generateSlug } from '@/utils/slug.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private permission: ProductPermission,
  ) {}

  async createProduct(dto: CreateProductDto) {
    const slug = generateSlug(dto.productName);

    const product = await this.productModel.create({
      ...dto,
      slug
    });

    return product;
  }

  async getAllProducts() {
    const products = await this.productModel
      .find()
      .sort({ createdAt: -1 })
      .exec();

    return {
      message: 'All products retrieved successfully',
      success: true,
      error: false,
      data: products,
    };
  }

  async getProductDetails(productId: string) {
    if (!productId) {
      return {
        message: 'Product ID is required',
        success: false,
        error: true,
      };
    }

    const product = await this.productModel.findById(productId);

    if (!product) {
      return {
        message: 'Product not found',
        success: false,
        error: true,
      };
    }

    return {
      data: product,
      message: 'Product retrieved successfully',
      success: true,
      error: false,
    };
  }

  async searchProducts(query: string) {
    if (!query) {
      throw new BadRequestException('Query parameter is required');
    }

    const regex = new RegExp(query, 'i');

    const products = await this.productModel.find({
      $or: [{ productName: regex }, { category: regex }],
    });

    return {
      data: products,
      message: 'Search product list',
      success: true,
      error: false,
    };
  }

  async getCategoryProductOne() {
    try {
      const categories = await this.productModel.distinct('category');

      const products = await Promise.all(
        categories.map(async (category) =>
          this.productModel.findOne({ category }),
        ),
      );

      const filtered = products.filter(Boolean);

      return {
        message: 'Category products retrieved successfully',
        data: filtered,
        success: true,
        error: false,
      };
    } catch (err) {
      throw new Error(err.message || 'Internal server error');
    }
  }

  async getCategoryWiseProduct(category: string) {
    if (!category) {
      throw new BadRequestException('Category is required');
    }

    const products = await this.productModel.find({ category });

    return {
      data: products,
      message: 'Products retrieved successfully',
      success: true,
      error: false,
    };
  }

  async filterProducts(category: string[], sortBy: 'asc' | 'desc') {
    if (!category || category.length === 0) {
      throw new BadRequestException('Category array is required');
    }

    const sortOption: Record<string, 1 | -1> =
      sortBy === 'asc'
        ? { sellingPrice: 1 }
        : { sellingPrice: -1 };

    const products = await this.productModel
      .find({ category: { $in: category } })
      .sort(sortOption);

    return {
      data: products,
      message: 'Products retrieved successfully',
      success: true,
      error: false,
    };
  }

  async updateProduct(userId: string, updateData: any) {
    const hasPermission = await this.permission.canUploadProduct(userId);

    if (!hasPermission) {
      throw new ForbiddenException('Permission denied');
    }

    const { _id, ...rest } = updateData;

    if (!_id) {
      throw new BadRequestException('Product ID is required');
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      _id,
      rest,
      { new: true },
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return {
      message: 'Product updated successfully',
      data: updatedProduct,
      success: true,
      error: false,
    };
  }

  async uploadProduct(userId: string, body: any) {
    const hasPermission = await this.permission.canUploadProduct(userId);

    if (!hasPermission) {
      throw new ForbiddenException('Permission denied');
    }

    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestException('Product data is required');
    }

    const newProduct = new this.productModel(body);
    const savedProduct = await newProduct.save();

    return {
      message: 'Product uploaded successfully',
      success: true,
      error: false,
      data: savedProduct,
    };
  }
}
