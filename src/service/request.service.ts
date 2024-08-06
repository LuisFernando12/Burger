import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRequestDTO, RequestResponseDTO } from 'src/dto/request.dto';
import { AxiosError } from 'axios';

@Injectable()
export class RequestService {
  constructor(private readonly httpService: HttpService) {}
  private async generateClientToken(token: string): Promise<string> {
    const { data } = await firstValueFrom(
      this.httpService
        .post(`${process.env.INTERNAL_API}/token`, {
          token,
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(error);
          }),
        ),
    );
    return data.access_token;
  }

  async create(
    request: CreateRequestDTO,
    token: string,
  ): Promise<RequestResponseDTO> {
    const clientToken = await this.generateClientToken(token);
    const { data } = await firstValueFrom(
      this.httpService
        .post(`${process.env.INTERNAL_API}/request`, request, {
          headers: { Authorization: clientToken },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(error);
          }),
        ),
    );
    return data;
  }

  async findRequestByUser(
    userId: number,
    token: string,
  ): Promise<RequestResponseDTO[]> {
    const clientToken = await this.generateClientToken(token);
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${process.env.INTERNAL_API}/request/client/${userId}`, {
          headers: { Authorization: clientToken },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(error);
          }),
        ),
    );
    return data;
  }
  async get(id: number, token: string): Promise<RequestResponseDTO> {
    const clientToken = await this.generateClientToken(token);
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${process.env.INTERNAL_API}/request/${id}`, {
          headers: { Authorization: clientToken },
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
