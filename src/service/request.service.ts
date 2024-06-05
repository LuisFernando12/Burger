import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ICreateRequest, IRequest } from 'src/interface/request.interface';
import { AxiosError } from 'axios';

@Injectable()
export class RequestService {
  constructor(private readonly httpService: HttpService) {}

  async create(request: ICreateRequest, token: string): Promise<IRequest> {
    const { data } = await firstValueFrom(
      this.httpService
        .post(`${process.env.INTERNAL_API}/request`, request, {
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

  async findRequestByUser(userId: number, token: string): Promise<IRequest[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${process.env.INTERNAL_API}/request/client/${userId}`, {
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
  async get(id: number, token: string): Promise<IRequest> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${process.env.INTERNAL_API}/request/${id}`, {
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
}
