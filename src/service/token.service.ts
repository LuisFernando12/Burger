import { RefreshToken } from 'src/dto/refreshToken.dto';
import { PrismaService } from './prisma.service';
import { GenereteTokenDTO, SaveTokenDTO, TokenDTO } from 'src/dto/token.dto';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TokenWhereUniqueInput } from 'prisma';
interface ITokenUpdate {
  access_token: string;
  expireIn: number;
}
@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(payload: GenereteTokenDTO): Promise<string> {
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

  private generateExpireIn(): number {
    const date = new Date();
    date.setHours(date.getHours() - 3);
    const expireIn = Math.floor(date.getTime() / 1000 + 60);
    return expireIn;
  }

  async refreshToken({ oldToken }: RefreshToken): Promise<TokenDTO> {
    return await this.saveToken({ token: oldToken });
  }

  async saveToken({ userId, token }: SaveTokenDTO): Promise<TokenDTO> {
    const where: TokenWhereUniqueInput = {};
    if (!token && userId) {
      where['userId'] = userId;
    } else if (!userId && token) {
      where['access_token'] = token;
    } else {
      throw new BadRequestException('Inavalid Params');
    }
    const tokenDB = await this.prisma.token.findUnique({
      where: where,
      include: { user: true },
    });
    if (!tokenDB) {
      const userDB = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      const payload = {
        sub: userDB.id,
        username: userDB.email,
        name: userDB.name,
      };
      const data: TokenDTO = {
        access_token: await this.generateToken(payload),
        expireIn: this.generateExpireIn(),
        userId: userId,
      };
      try {
        const tokenCreateDB = await this.prisma.token.create({
          data,
        });
        delete tokenCreateDB.userId;
        delete tokenCreateDB.id;
        return tokenCreateDB;
      } catch (error) {
        console.log(error);
        throw new ForbiddenException();
      }
    }
    if (tokenDB) {
      const payload = {
        sub: tokenDB.user.id,
        username: tokenDB.user.email,
        name: tokenDB.user.name,
      };
      let access_token: string;
      try {
        access_token = await this.generateToken(payload);
      } catch (error) {
        throw new ForbiddenException();
      }

      const data: ITokenUpdate = {
        access_token,
        expireIn: this.generateExpireIn(),
      };

      const tokenUpdateDB = await this.prisma.token.update({
        where: { id: tokenDB.id, userId: tokenDB.userId },
        data,
      });
      delete tokenUpdateDB.userId;
      delete tokenUpdateDB.id;
      return tokenUpdateDB;
    }
    throw new InternalServerErrorException();
  }
}
