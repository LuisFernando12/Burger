import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Login } from "src/interface/login.interface";
import { AuthService } from "src/service/auth.service";

@Controller("/auth")
export class AuthController{
    constructor(
        private readonly authService : AuthService,
        private readonly jwtService: JwtService
    ){}

    // TODO: Alterar para ultilizar token
    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async login(@Body() data:Login){
        const userDB = await this.authService.login(data);
        const payload = {sub: userDB.email, username: userDB.name};
        const access_token = await this.jwtService.signAsync(payload);
        return {access_token};
    }
}