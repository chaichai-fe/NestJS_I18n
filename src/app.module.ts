import { Module } from '@nestjs/common';
import { LangTagModule } from './langTags/langTag.module';

@Module({
  imports: [LangTagModule],
})
export class AppModule {}
