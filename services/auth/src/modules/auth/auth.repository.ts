import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../../utilities/prisma/prisma.service';
import { AuthProducer } from './auth.producer';
import { KAFKA_EVENT } from '../../utilities/kafka/kafka.event';

@Injectable()
export class AuthRepository {
  constructor(
    readonly prismaService: PrismaService,
    readonly producer: AuthProducer,
  ) {}

  create(payload: CreateAuthDto) {
    try {
      return this.prismaService.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: payload,
        });
        await this.producer.send({
          data: [user],
          event: KAFKA_EVENT.CREATED,
          key: user.id,
        });
        return user;
      });
    } catch (error) {
      console.log('Error while signing and produce kafka event', error);
      throw error;
    }
  }

  findOne(whereQuery: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where: whereQuery,
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
