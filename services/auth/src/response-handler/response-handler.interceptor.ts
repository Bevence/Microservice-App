import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  PreconditionFailedException,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IResponsePayload } from './response-handler.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ResponseHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: IResponsePayload) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  responseHandler(res: IResponsePayload, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const status = response.statusCode();

    response.status(status).json({
      success: true,
      ...res,
    });
  }

  errorHandler(err: HttpException, context: ExecutionContext) {
    console.log('err precondition', err instanceof PreconditionFailedException);
    console.log('err prisma', err instanceof PrismaClientKnownRequestError);
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = err.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    console.log('err.response.message', err.getResponse()['message']);
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: err.message,
    });
  }
}
