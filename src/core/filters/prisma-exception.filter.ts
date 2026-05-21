import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Prisma } from '../../../generated/prisma';
import { IApiResponse } from '../common/interfaces';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest();

    let status = 500;
    let message = 'Database error';
    let code = 'DATABASE_ERROR';

    switch (exception.code) {
      case 'P2002':
        status = 409;
        message = 'Unique constraint violation';
        code = 'UNIQUE_CONSTRAINT_VIOLATION';
        break;
      case 'P2025':
        status = 404;
        message = 'Record not found';
        code = 'RECORD_NOT_FOUND';
        break;
      case 'P2003':
        status = 400;
        message = 'Foreign key constraint failed';
        code = 'FOREIGN_KEY_CONSTRAINT_FAILED';
        break;
      default:
        this.logger.error(
          `Unhandled Prisma error: ${exception.code}`,
          exception.message,
        );
    }

    const errorResponse: IApiResponse = {
      success: false,
      error: {
        code,
        message,
        details: {
          prismaCode: exception.code,
          meta: exception.meta,
        },
      },
    };

    this.logger.error(
      `${request.method} ${request.url} ${status} - ${JSON.stringify(errorResponse.error)}`,
    );

    response.status(status).send(errorResponse);
  }
}
