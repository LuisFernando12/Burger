import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "src/controller/auth.controller";
import { AuthService } from "src/service/auth.service";
import { PrismaService } from "src/service/prisma.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          global: true,
          secret: process.env.SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
})
export class AuthModule{
    
}