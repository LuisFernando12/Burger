import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ProductDTO } from 'src/dto/product.dto';

type Category = 'FOOD' | 'DRINK' | 'DESSERT';

@Injectable()
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  async findByCategory(category: Category): Promise<ProductDTO[] | null> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${process.env.INTERNAL_API}/product/category/${category}`)
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(error);
          }),
        ),
    );

    return data;
  }
  async findAll(): Promise<ProductDTO[] | null> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${process.env.INTERNAL_API}/product`, {}).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );
    return data;
  }
  async get(id: number): Promise<ProductDTO> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${process.env.INTERNAL_API}/product/${id}`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );
    return data;
  }
}
