import { Module } from '@nestjs/common';
import { LangModule } from './lang/lang.module';
import { LangTagModule } from './langTag/langTag.module';
@Module({
  imports: [LangModule, LangTagModule],
})
export class AppModule {}
