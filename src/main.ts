import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'
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
    .setTitle('Translation API')
    .setDescription('Translation API description')
    .setVersion('1.0')
    .addTag('translations')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'JWT Token, format: Bearer <token>',
        in: 'header',
      },
      'access-token',
    )
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  const theme = new SwaggerTheme()
  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.MUTED),
  }
  SwaggerModule.setup('swagger', app, documentFactory, options)

  // 设置端口
  await app.listen(process.env.PORT ?? 3000)
}

void bootstrap()
