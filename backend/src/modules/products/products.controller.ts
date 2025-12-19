import { Controller, Get, Post, Body, Req, Query, UseGuards } from '@nestjs/common';
import { GetProductDetailsDto } from './dto/get-product-details.dto';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../common/guards';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Post('details')
  async getProductDetails(@Body() body: GetProductDetailsDto) {
    return this.productsService.getProductDetails(body.productId);
  }

  @Get('search')
  async searchProducts(@Query('v') query: string) {
    return this.productsService.searchProducts(query);
  }

  @Get('category-one')
  async getCategoryProductOne() {
    return this.productsService.getCategoryProductOne();
  }

  @Post('category-product')
  async getCategoryWiseProductPost(@Body('category') category: string) {
    return this.productsService.getCategoryWiseProduct(category);
  }

  @Post('filter')
  async filterProducts(
    @Body('category') category: string[],
    @Body('sortBy') sortBy: 'asc' | 'desc',
  ) {
    return this.productsService.filterProducts(category, sortBy);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateProduct(@Req() req, @Body() body: any) {
    return this.productsService.updateProduct(req.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  async uploadProduct(@Req() req, @Body() body: any) {
    return this.productsService.uploadProduct(req.userId, body);
  }
}