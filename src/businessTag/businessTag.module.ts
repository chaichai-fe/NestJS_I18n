import { Module } from '@nestjs/common'
import { BusinessTagController } from './businessTag.controller'
import { BusinessTagService } from './businessTag.service'

@Module({
  controllers: [BusinessTagController],
  providers: [BusinessTagService],
})
export class BusinessTagModule {}
