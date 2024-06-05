import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async get(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        documentNumber: true,
        email: true,
        createdAt: true,
        active: true,
        role: true,
      },
    });
  }

  async find() {
    return this.prisma.user.findMany({
      where: { active: true },
    });
  }
  async update(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }
  async delete(id: number) {
    return this.prisma.user.update({
      data: { active: false },
      where: { id, active: true },
    });
  }
}
