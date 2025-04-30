import { Module } from '@nestjs/common';
import { LangTagModule } from './langTags/langTag.module';
import { BusinessModule } from './businessTags/business.module';
@Module({
  imports: [LangTagModule, BusinessModule],
})
export class AppModule {}
