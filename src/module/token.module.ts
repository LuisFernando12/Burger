import { Module } from "@nestjs/common";
import { TokenController } from "src/controller/token.controller";
import { PrismaService } from "src/service/prisma.service";
// import { ConfigModule } from "@nestjs/config";
// import { JwtModule, JwtService } from "@nestjs/jwt";
import { TokenService } from "src/service/token.service";

@Module({
    controllers: [TokenController],
    providers: [TokenService, PrismaService],
})
export class TokenModule { }