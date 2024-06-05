import { Module } from '@nestjs/common';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { PrismaService } from 'src/service/prisma.service';
import { TokenService } from 'src/service/token.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, TokenService],
  exports: [AuthService],
})
export class AuthModule {}
