import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const { method, url, ip } = req;
    const start = Date.now();

    // Use Fastify's hook system instead of Express-style res.on
    res.raw.on('finish', () => {
      const statusCode = res.statusCode;
      const duration = Date.now() - start;

      this.logger.log(
        `${method} ${url} ${statusCode} ${duration}ms - ${ip}`,
        'HTTP',
      );
    });

    next();
  }
}
