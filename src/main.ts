import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 设置全局前缀
  app.setGlobalPrefix('api')
  // 全局验证管道
  app.useGlobalPipes(new ValidationPipe())
  // 设置全局CORS
  app.enableCors({
    origin: true, // 允许所有来源，生产环境建议设置具体的域名
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  // 设置Swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, documentFactory)
  // 设置端口
  await app.listen(process.env.PORT ?? 3000)
}

void bootstrap()
