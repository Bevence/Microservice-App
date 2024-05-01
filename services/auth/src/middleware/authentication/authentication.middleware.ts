import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationMiddleware implements CanActivate {
  constructor(
    readonly reflector: Reflector,
    readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get('isPublic', context.getHandler());

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;
    if (!token) return false;

    try {
      const decoded = this.jwtService.decode(token.split(' ')[1]);
      const { id, fullName, userName, email } = decoded;
      request.user = {
        id,
        fullName,
        userName,
        email,
      };
      return true;
    } catch (error) {
      return false;
    }
  }
}
