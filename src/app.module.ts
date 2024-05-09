import { AuthModule } from './module/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './module/user.module';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule { }
