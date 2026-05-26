import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { IApiResponse } from '../common/interfaces';

@Catch(ZodError)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest();

    const errorResponse: IApiResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: this.formatValidationErrors(exception),
      },
    };

    this.logger.warn(
      `${request.method} ${request.url} 422 - ${JSON.stringify(errorResponse.error)}`,
    );

    response.status(422).send(errorResponse);
  }

  private formatValidationErrors(exception: ZodError) {
    return exception.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
      code: error.code,
    }));
  }
}
