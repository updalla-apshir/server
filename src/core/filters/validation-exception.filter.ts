import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { IApiResponse } from '../common/interfaces';

@Catch(ZodError, BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: ZodError | BadRequestException, host: ArgumentsHost) {
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

  private formatValidationErrors(exception: ZodError | BadRequestException) {
    if (exception instanceof ZodError) {
      return exception.errors.map((error) => ({
        field: error.path.join('.'),
        message: error.message,
        code: error.code,
      }));
    }

    return {
      message: exception.message,
      details: (exception as any).response?.message || [],
    };
  }
}
