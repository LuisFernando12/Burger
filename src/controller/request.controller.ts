import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Token } from 'src/decorators/token.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { ICreateRequest, IRequest } from 'src/interface/request.interface';
import { RequestService } from 'src/service/request.service';

@Controller('/request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async create(
    @Body() request: ICreateRequest,
    @Token() token: string,
  ): Promise<IRequest> {
    if (request) {
      try {
        return await this.requestService.create(request, token);
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
    throw new BadRequestException();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getRequest(
    @Param('id') id: number,
    @Token() token: string,
  ): Promise<IRequest> {
    if (id) {
      try {
        return await this.requestService.get(Number(id), token);
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
    throw new BadRequestException();
  }
  @Get('/user/:userId')
  @UseGuards(AuthGuard)
  async findRequestByUser(
    @Param('userId') userId: number,
    @Token() token: string,
  ): Promise<IRequest[]> {
    if (userId) {
      try {
        return await this.requestService.findRequestByUser(
          Number(userId),
          token,
        );
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
    throw new BadRequestException();
  }
}
