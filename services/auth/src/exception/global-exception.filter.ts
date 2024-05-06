import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  PreconditionFailedException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const logger = new Logger(exception.name);
    logger.error(
      exception['message'] +
        ' ' +
        JSON.stringify(exception.getResponse()['message']),
    );

    if (exception instanceof PreconditionFailedException) {
      const errResponse = exception.getResponse() as {
        message: unknown;
        error: string;
        statusCode: number;
      };
      res.status(errResponse.statusCode).json({
        success: false,
        message: errResponse.error,
        detail: errResponse.message,
      });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ' Internal Server Error 🛑😞',
      });
    }
  }
}
