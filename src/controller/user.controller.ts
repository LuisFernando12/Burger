import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserDTO,
  UserResponseDTO,
  UserUpdateDTO,
} from 'src/interface/user.interface';
import { UserService } from 'src/service/user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private async encryptPassword(password: string): Promise<string> {
    const saltOrRounds: number = 10;
    password = await bcrypt.hash(password, saltOrRounds);
    return password;
  }

  @Post()
  @ApiCreatedResponse({ type: 'string' })
  async create(@Body() data: CreateUserDTO): Promise<string> {
    data.password = await this.encryptPassword(data.password);
    try {
      await this.userService.create(data);
      return 'ok';
    } catch (error) {
      if (error.meta && error.meta.target) {
        throw new BadRequestException('Ivalid params');
      }
    }
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  @ApiCreatedResponse({ type: UserResponseDTO })
  async get(@Param('id') id: number): Promise<UserResponseDTO> {
    id = Number(id);
    const userDB = await this.userService.get(id);
    if (!userDB) {
      throw new NotFoundException();
    }
    return userDB;
  }

  // @UseGuards(AuthGuard)
  // @Get('/')
  // async find(): Promise<User[]> {
  //   const userDB = await this.userService.find();

  //   if (userDB.length == 0) {
  //     return [];
  //   }

  //   return userDB;
  // }

  @UseGuards(AuthGuard)
  @Put('/:id')
  @ApiCreatedResponse({ type: 'string' })
  async update(
    @Param('id') id: number,
    @Body() data: UserUpdateDTO,
  ): Promise<string> {
    id = Number(id);
    try {
      await this.userService.update(id, data);
      return 'ok';
    } catch (error) {
      if (error.meta && error.meta.cause) {
        throw new InternalServerErrorException(error.meta.cause);
      }
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  @ApiCreatedResponse({ type: 'string' })
  async delete(@Param('id') id: number): Promise<string> {
    id = Number(id);
    try {
      await this.userService.delete(id);
      return 'ok';
    } catch (error) {
      if (error.meta && error.meta.cause) {
        throw new InternalServerErrorException(error.meta.cause);
      }
      throw new InternalServerErrorException();
    }
  }
}
