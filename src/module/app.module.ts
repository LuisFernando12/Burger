import { AuthModule } from './auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './product.module';
import { RequestModule } from './request.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
    AuthModule,
    TokenModule,
    ProductModule,
    RequestModule,
  ],
  exports: [JwtModule],
})
export class AppModule {}
