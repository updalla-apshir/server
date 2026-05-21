import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const corsConfig = this.configService.cors;

    res.header('Access-Control-Allow-Origin', corsConfig.origin.join(', '));
    res.header(
      'Access-Control-Allow-Credentials',
      corsConfig.credentials.toString(),
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
