import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LangTagModule } from './langTags/langTag.module';

@Module({
  imports: [LangTagModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*');
  }
}
