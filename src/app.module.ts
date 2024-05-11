import { AuthModule } from './module/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './module/user.module';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './module/token.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
        global: true,
        secret: process.env.SECRET,
        signOptions: { expiresIn: '60s' },
    }),
UserModule, AuthModule, TokenModule],
exports:[JwtModule]

})
export class AppModule { }
