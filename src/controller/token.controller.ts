import { JwtService } from '@nestjs/jwt';
import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { IRefreshToken } from 'src/interface/refreshToken.interface';
import { TokenService } from 'src/service/token.service';

@Controller("/token")

export class TokenController{
    constructor(
        private tokenService: TokenService,
        private jwtService: JwtService
    ){}
    @HttpCode(HttpStatus.OK)
    @Post("/refresh")
    async refreshToken(@Body() data: IRefreshToken): Promise<any> {
        const token = await this.tokenService.refreshToken(data);
        if(token){
            return token;
        }
        throw new UnauthorizedException()
    }
}