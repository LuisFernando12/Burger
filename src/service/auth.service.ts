import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import * as bcrypt from 'bcrypt'
import { Login } from "src/interface/login.interface";
@Injectable()

export class AuthService {
    constructor(private prisma: PrismaService) { }
    private async comparePassword(password: string, hash: string): Promise<Boolean> {
        return await bcrypt.compare(password, hash)
    }
    async login(data: Login) {
        const { password, email } = data
        const userDB = await this.prisma.user.findUnique({ where: { email } })
        const { password: hash, ...result } = userDB;
        if (userDB || this.comparePassword(password, hash)) {
            return result;
        }
        throw new UnauthorizedException()
    }
}