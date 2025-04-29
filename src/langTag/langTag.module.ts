import { Module } from '@nestjs/common';
import { LangTagController } from './langTag.controller';
import { LangTagService } from './langTag.service';

@Module({
  controllers: [LangTagController],
  providers: [LangTagService],
})
export class LangTagModule {}
