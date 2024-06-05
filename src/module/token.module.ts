import { Module } from '@nestjs/common';
import { TokenController } from 'src/controller/token.controller';
import { PrismaService } from 'src/service/prisma.service';
import { TokenService } from 'src/service/token.service';

@Module({
  controllers: [TokenController],
  providers: [TokenService, PrismaService],
})
export class TokenModule {}
