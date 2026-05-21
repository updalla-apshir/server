import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ConfigService } from '../config/config.service';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requests = new Map<string, { count: number; resetTime: number }>();

  constructor(private configService: ConfigService) {}

  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const rateLimitConfig = this.configService.rateLimit;
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const windowStart =
      Math.floor(now / (rateLimitConfig.ttl * 1000)) *
      (rateLimitConfig.ttl * 1000);

    if (!this.requests.has(clientIP)) {
      this.requests.set(clientIP, {
        count: 0,
        resetTime: windowStart + rateLimitConfig.ttl * 1000,
      });
    }

    const clientData = this.requests.get(clientIP)!;

    if (now > clientData.resetTime) {
      clientData.count = 0;
      clientData.resetTime = windowStart + rateLimitConfig.ttl * 1000;
    }

    if (clientData.count >= rateLimitConfig.limit) {
      res.code(429).send({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests',
        },
      });
      return;
    }

    clientData.count++;
    res.header('X-RateLimit-Limit', rateLimitConfig.limit.toString());
    res.header(
      'X-RateLimit-Remaining',
      (rateLimitConfig.limit - clientData.count).toString(),
    );
    res.header('X-RateLimit-Reset', clientData.resetTime.toString());

    next();
  }
}
