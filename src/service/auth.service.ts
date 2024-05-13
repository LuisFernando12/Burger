import { TokenService } from 'src/service/token.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import * as bcrypt from 'bcrypt'
import { Login as ILogin } from "src/interface/login.interface";
@Injectable()

export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tokenService: TokenService
    ) { }
    private async comparePassword(password: string, hash: string): Promise<Boolean> {
        return await bcrypt.compare(password, hash)
    }
    async login(data: ILogin) {
        const { password, email } = data
        const userDB = await this.prisma.user.findUnique({ where: { email: email, active: true } })
        if(userDB){
            const { password: hash, } = userDB;
            if (this.comparePassword(password, hash)) {
                const payload = { userId: userDB.id };
                const access_token = await this.tokenService.saveToken(payload);
                if(!access_token){
                    throw new UnauthorizedException()
                }
                return access_token ;
            }
        }else{
            throw new UnauthorizedException()
        }
    }
}