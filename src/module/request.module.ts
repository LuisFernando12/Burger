import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RequestController } from 'src/controller/request.controller';
import { RequestService } from 'src/service/request.service';

@Module({
  imports: [HttpModule],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
