import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LangModule } from './lang/lang.module';
import { LangTagModule } from './langTags/langTag.module';

@Module({
  imports: [LangModule, LangTagModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*');
  }
}
