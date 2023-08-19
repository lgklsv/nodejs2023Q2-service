import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HomeLibraryServiceLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new HomeLibraryServiceLogger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        'HTTP',
      );
    });

    next();
  }
}
