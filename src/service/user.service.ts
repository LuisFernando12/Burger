import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { UserResponseDTO } from 'src/interface/user.interface';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<string> {
    try {
      this.prisma.user.create({
        data,
      });
      return 'ok';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async get(id: number): Promise<UserResponseDTO> {
    const userDB = await this.prisma.user.findUnique({
      where: { id, active: true },
      select: {
        name: true,
        documentNumber: true,
        email: true,
        createdAt: true,
        active: true,
      },
    });
    if (!userDB) {
      throw new NotFoundException('User not found');
    }
    return userDB;
  }

  // async find() {
  //   return this.prisma.user.findMany({
  //     where: { active: true },
  //   });
  // }
  async update(id: number, data: Prisma.UserUpdateInput): Promise<string> {
    try {
      this.prisma.user.update({
        data,
        where: { id },
      });
      return 'ok';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async delete(id: number): Promise<string> {
    try {
      this.prisma.user.delete({
        where: { id, active: true },
      });
      return 'ok';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
