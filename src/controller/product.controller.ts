import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductService } from 'src/service/product.service';

type Category = 'FOOD' | 'DRINK' | 'DESSERT';

@Controller('/product')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('/')
  @ApiCreatedResponse({ type: [ProductDTO] })
  async findAll(): Promise<ProductDTO[]> {
    return await this.productService.findAll();
  }
  @Get('/category/:category')
  @ApiCreatedResponse({ type: [ProductDTO] })
  async findByCategory(
    @Param('category') category: Category,
  ): Promise<ProductDTO[]> {
    return await this.productService.findByCategory(
      category.toUpperCase() as Category,
    );
  }
  @Get('/:id')
  @ApiCreatedResponse({ type: ProductDTO })
  async getProduct(@Param('id') id: number): Promise<ProductDTO> {
    return await this.productService.get(Number(id));
  }
}
