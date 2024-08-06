import { ApiProperty } from '@nestjs/swagger';
type Category = 'FOOD' | 'DRINK' | 'DESSSERT';

export class ProductDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  suplier?: string;
  @ApiProperty()
  category: Category;
  @ApiProperty()
  ingredientIds: [number];
}

// export class ResponseProductDTO extends OmitType(ProductDTO, [
//   'ingredientIds',
// ] as const) {}
