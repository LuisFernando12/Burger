import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiCreatedResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { Login } from 'src/dto/login.dto';
import { TokenDTO } from 'src/dto/token.dto';
import { AuthService } from 'src/service/auth.service';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiCreatedResponse({ type: OmitType(TokenDTO, ['userId'] as const) })
  async login(@Body() data: Login): Promise<TokenDTO> {
    const access_token = await this.authService.login(data);
    return access_token;
  }
}
