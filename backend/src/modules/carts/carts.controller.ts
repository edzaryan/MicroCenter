import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAuthGuard } from '../common/guards';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  addToCart(@Body('productId') productId: string, @Req() req) {
    return this.cartsService.addToCart(req.userId, productId);
  }

  @Get()
  getUserCart(@Req() req) {
    return this.cartsService.getCartProducts(req.userId);
  }

  @Get('count')
  count(@Req() req) {
    return this.cartsService.countCartItems(req.userId);
  }

  @Post('update')
  updateCart(
    @Body('_id') id: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartsService.updateCartProduct(id, quantity);
  }

  @Post('delete')
  delete(@Body('_id') id: string): Promise<any> {
    return this.cartsService.deleteCartProduct(id);
  }
}
