import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Token } from 'src/decorators/token.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { IProduct } from 'src/interface/product.interface';
import { ProductService } from 'src/service/product.service';

@Controller('/product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('/')
  @UseGuards(AuthGuard)
  @UseGuards(AuthGuard)
  async findAll(@Token() token: string): Promise<IProduct[]> {
    return await this.productService.findAll(token);
  }
  @Get('/example')
  @UseGuards(AuthGuard)
  example(@Token() token: string): string {
    return `token: ${token}`;
  }
  @Get('/:id')
  @UseGuards(AuthGuard)
  async getProduct(
    @Param('id') id: number,
    @Token() token: string,
  ): Promise<IProduct> {
    return await this.productService.get(Number(id), token);
  }
}
