import { Module } from '@nestjs/common';
import { LangTagModule } from './langTag/langTag.module';
import { BusinessTagModule } from './businessTag/businessTag.module';
import { TranslationsModule } from './translations/translations.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [LangTagModule, BusinessTagModule, TranslationsModule, UserModule],
})
export class AppModule {}
