import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany();
  }
}
