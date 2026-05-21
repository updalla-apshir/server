import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const origin = process.env.CORS_ORIGIN;
    const credentials = process.env.CORS_CREDENTIALS;

    res.header('Access-Control-Allow-Origin', origin);
    res.header(
      'Access-Control-Allow-Credentials',
      credentials.toString(),
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    );

    if (req.method === 'OPTIONS') {
      res.code(200).send();
    } else {
      next();
    }
  }
}
