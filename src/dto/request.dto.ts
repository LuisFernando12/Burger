import { ApiProperty, ApiResponseProperty, OmitType } from '@nestjs/swagger';
import { ProductDTO } from './product.dto';
import { IsNumber } from 'class-validator';
export class CreateRequestDTO {
  @ApiProperty()
  @IsNumber()
  clientId: number;
  @ApiProperty({
    type: [Number],
  })
  @IsNumber({}, { each: true })
  productIds: [number];
}
export class RequestResponseDTO {
  @ApiResponseProperty()
  createdAt: Date;
  @ApiResponseProperty()
  status: 'PENDING' | 'RECEIVED' | 'IN_PREPARATION' | 'READY' | 'CANCELED';
  @ApiResponseProperty()
  clientId: number;
  @ApiResponseProperty({
    type: [OmitType(ProductDTO, ['ingredientIds'] as const)],
  })
  products: Omit<ProductDTO, 'ingredientIds'>[];
}
