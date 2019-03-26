import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const registerSwagger = app => (route = '/api') => {
  const options = new DocumentBuilder()
    .setTitle('nest-reset-server')
    .setDescription('API 文档')
    .setVersion('0.0.1')
    .setBasePath('/')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(route, app, document);
};
