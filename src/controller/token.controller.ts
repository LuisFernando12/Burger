import { JwtService } from '@nestjs/jwt';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshToken } from 'src/dto/refreshToken.dto';
import { TokenService } from 'src/service/token.service';
import { TokenDTO } from 'src/dto/token.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('/token')
@ApiTags('Token')
export class TokenController {
  constructor(
    private tokenService: TokenService,
    private jwtService: JwtService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  @ApiCreatedResponse({ type: TokenDTO })
  async refreshToken(@Body() data: RefreshToken): Promise<TokenDTO> {
    const token = await this.tokenService.refreshToken(data);
    if (token) {
      return token;
    }
    throw new UnauthorizedException();
  }
}
