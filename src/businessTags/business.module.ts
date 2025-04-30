import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessTagService } from './business.service';

@Module({
  controllers: [BusinessController],
  providers: [BusinessTagService],
})
export class BusinessModule {}
