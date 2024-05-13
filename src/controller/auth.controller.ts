import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Login } from "src/interface/login.interface";
import { IToken } from "src/interface/token.interface";
import { AuthService } from "src/service/auth.service";

@Controller("/auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async login(@Body() data: Login): Promise<IToken> {
        const access_token = await this.authService.login(data);
        return access_token;
    }
}