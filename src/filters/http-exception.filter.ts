import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

// 捕获程序 所有的异常 统一发送给前端
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();

    response
      .status(statusCode)
      .json({
        statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
