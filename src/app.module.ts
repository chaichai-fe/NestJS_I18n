import { Module } from '@nestjs/common';
import { LangTagModule } from './langTag/langTag.module';
import { BusinessTagModule } from './businessTag/businessTag.module';
import { TranslationsModule } from './translations/translations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LangTagModule, BusinessTagModule, TranslationsModule, AuthModule],
})
export class AppModule {}
