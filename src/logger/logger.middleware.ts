import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HomeLibraryServiceLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new HomeLibraryServiceLogger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, query, body } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;

      const message = `${method} ${originalUrl} ${statusCode} query parameters: ${JSON.stringify(
        query,
      )}, body: ${JSON.stringify(body)} - ${userAgent} ${ip}`;

      if (statusCode < 400) {
        this.logger.log(message, 'HTTP');
      }
    });

    next();
  }
}
