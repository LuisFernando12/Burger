import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/decorators/token.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductService } from 'src/service/product.service';

@Controller('/product')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('/')
  @ApiCreatedResponse({ type: [ProductDTO] })
  async findAll(): Promise<ProductDTO[]> {
    return await this.productService.findAll();
  }
  @Get('/example')
  @UseGuards(AuthGuard)
  example(@Token() token: string): string {
    return `token: ${token}`;
  }
  @Get('/:id')
  @ApiCreatedResponse({ type: ProductDTO })
  async getProduct(@Param('id') id: number): Promise<ProductDTO> {
    return await this.productService.get(Number(id));
  }
}
