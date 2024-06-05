import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { IProduct } from 'src/interface/product.interface';

@Injectable()
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(token: string): Promise<IProduct[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${process.env.INTERNAL_API}/product`, {
          headers: { Authorization: token },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(error);
          }),
        ),
    );
    return data;
  }
  async get(id: number, token: string): Promise<IProduct> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${process.env.INTERNAL_API}/product/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(error);
          }),
        ),
    );
    return data;
  }
}
