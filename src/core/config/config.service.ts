import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get database() {
    return {
      url:
        process.env.DATABASE_URL || 'postgresql://localhost:5432/property_db',
    };
  }

  get jwt() {
    return {
      secret: process.env.JWT_SECRET || 'your-secret-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    };
  }

  get port(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }

  get isDevelopment(): boolean {
    return process.env.NODE_ENV !== 'production';
  }

  get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  get logLevel(): string {
    return process.env.LOG_LEVEL || 'info';
  }

  get cors() {
    return {
      enabled: process.env.CORS_ENABLED !== 'false',
      origin: process.env.CORS_ORIGIN?.split(',') || ['*'],
      credentials: process.env.CORS_CREDENTIALS !== 'false',
    };
  }

  get rateLimit() {
    // ttl in seconds, limit as max requests
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);
    const limit = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);
    return {
      ttl: windowMs / 1000, // convert to seconds
      limit,
    };
  }

  get helmet() {
    return {
      enabled: process.env.HELMET_ENABLED !== 'false',
    };
  }
}
