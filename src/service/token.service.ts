import { IRefreshToken } from 'src/interface/refreshToken.interface';
import { PrismaService } from './prisma.service';
import {
  IGenereteToken,
  ISaveToken,
  IToken,
  ITokenUpdate,
} from 'src/interface/token.interface';
import { JwtService } from '@nestjs/jwt';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TokenWhereUniqueInput } from 'prisma';
@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(payload: IGenereteToken): Promise<string> {
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

  private generateExpireIn(): number {
    const date = new Date();
    date.setHours(date.getHours() - 3);
    const expireIn = Math.floor(date.getTime() / 1000 + 60);
    return expireIn;
  }

  async refreshToken({ oldToken }: IRefreshToken): Promise<IToken> {
    return await this.saveToken({ token: oldToken });
  }

  async saveToken({ userId, token }: ISaveToken): Promise<IToken> {
    const where: TokenWhereUniqueInput = {};
    if (!token) {
      where['userId'] = userId;
    } else {
      where['access_token'] = token;
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
      const data: IToken = {
        access_token: await this.generateToken(payload),
        expireIn: this.generateExpireIn(),
        userId: userId,
      };
      const tokenCreateDB = await this.prisma.token.create({
        data,
      });
      const { id: _, ...result } = tokenCreateDB;
      return result;
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
      const { id: _, ...result } = tokenUpdateDB;
      return result;
    }
    throw new InternalServerErrorException();
  }
}
