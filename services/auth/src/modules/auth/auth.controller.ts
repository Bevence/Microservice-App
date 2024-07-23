import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-user.dto';
import { AUTH_CONSTANTS } from './auth.constant';
import { plainToInstance } from 'class-transformer';
import { LoginResponseDto } from './dto/auth-response.dto';
import { IsPublic } from 'src/custom-decorator/is-public/is-public.decorator';
import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signup')
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    await this.authService.create(createAuthDto);
    return { message: AUTH_CONSTANTS.SUCCESS_MESSAGE.SIGNUP_SUCCESS };
  }

  @IsPublic()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return {
      message: AUTH_CONSTANTS.SUCCESS_MESSAGE.LOGIN_SUCCESS,
      data: plainToInstance(LoginResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    };
  }
}
