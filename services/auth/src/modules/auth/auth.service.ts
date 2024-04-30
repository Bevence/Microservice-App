import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login-user.dto';
import { AUTH_CONSTANTS } from './auth.constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private repository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  create(payload: CreateAuthDto) {
    return this.repository.create(payload);
  }

  async login(data: LoginDto) {
    const user = await this.repository.findOne({
      userName: data.userName,
    });
    if (!user)
      throw new NotFoundException(AUTH_CONSTANTS.ERROR_MESSAGE.USER_NOT_FOUND);

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword)
      throw new NotFoundException(AUTH_CONSTANTS.ERROR_MESSAGE.USER_NOT_FOUND);

    const accessToken = this.jwtService.sign({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      userName: user.userName,
    });
    return { ...user, accessToken };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
