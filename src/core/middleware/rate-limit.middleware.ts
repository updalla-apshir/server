import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requests = new Map<string, { count: number; resetTime: number }>();

  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const ttl = parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10);
    const limit = parseInt(process.env.RATE_LIMIT_MAX, 10);
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const windowStart =
      Math.floor(now / ttl) * ttl;

    if (!this.requests.has(clientIP)) {
      this.requests.set(clientIP, {
        count: 0,
        resetTime: windowStart + ttl,
      });
    }

    const clientData = this.requests.get(clientIP)!;

    if (now > clientData.resetTime) {
      clientData.count = 0;
      clientData.resetTime = windowStart + ttl;
    }

    if (clientData.count >= limit) {
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
    res.header('X-RateLimit-Limit', limit.toString());
    res.header(
      'X-RateLimit-Remaining',
      (limit - clientData.count).toString(),
    );
    res.header('X-RateLimit-Reset', clientData.resetTime.toString());

    next();
  }
}
