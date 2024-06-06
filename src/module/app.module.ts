import { AuthModule } from './auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './product.module';
import { RequestModule } from './request.module';
import { AppController } from 'src/controller/app.controller';
import { AppService } from 'src/service/app.service';

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
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {}
