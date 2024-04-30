import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-user.dto';
import { AUTH_CONSTANTS } from './auth.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    await this.authService.create(createAuthDto);
    return { message: AUTH_CONSTANTS.SUCCESS_MESSAGE.SIGNUP_SUCCESS };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return {
      message: AUTH_CONSTANTS.SUCCESS_MESSAGE.LOGIN_SUCCESS,
      data: user,
    };
  }

  @Get()
  findAll() {
    throw new NotFoundException('Not found');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
