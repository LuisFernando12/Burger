import { Module } from "@nestjs/common";
import { AuthController } from "src/controller/auth.controller";
import { UserController } from "src/controller/user.controller";
import { PrismaService } from "src/service/prisma.service";
import { UserService } from "src/service/user.service";

@Module({
    controllers:[UserController],
    providers:[UserService, PrismaService]
})
export class UserModule{}