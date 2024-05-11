import { Module } from "@nestjs/common";
import { UserController } from "src/controller/user.controller";
import { PrismaService } from "src/service/prisma.service";
import { UserService } from "src/service/user.service";
import { AuthModule } from "./auth.module";

@Module({
    controllers:[UserController],
    providers:[UserService, PrismaService]
})
export class UserModule{}