import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const logger = new Logger(exception.name);
    logger.error(exception['message']);
    console.log('exception', exception);

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const field = exception.meta.target;
        response.status(status).json({
          statusCode: status,
          message: `🛑 Unique constraint violation detected on field: ${field}.`,
        });
        break;
      }
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
