import { Module } from '@nestjs/common';
import { LangTagModule } from './langTag/langTag.module';
import { BusinessTagModule } from './businessTag/businessTag.module';
import { TranslationsModule } from './translations/translations.module';
@Module({
  imports: [LangTagModule, BusinessTagModule, TranslationsModule],
})
export class AppModule {}
