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
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/decorators/token.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateRequestDTO, RequestResponseDTO } from 'src/dto/request.dto';
import { RequestService } from 'src/service/request.service';

@Controller('/request')
@ApiTags('Request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: RequestResponseDTO })
  async create(
    @Body() request: CreateRequestDTO,
    @Token() token: string,
  ): Promise<RequestResponseDTO> {
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
  @ApiCreatedResponse({ type: RequestResponseDTO })
  async getRequest(
    @Param('id') id: number,
    @Token() token: string,
  ): Promise<RequestResponseDTO> {
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
  @ApiCreatedResponse({ type: [RequestResponseDTO] })
  async findRequestByUser(
    @Param('userId') userId: number,
    @Token() token: string,
  ): Promise<RequestResponseDTO[]> {
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
