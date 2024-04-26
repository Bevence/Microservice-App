import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { AuthProducer } from './auth.producer';
import { KAFKA_EVENT } from 'src/utilities/kafka/kafka.event';

@Injectable()
export class AuthRepository {
  constructor(
    readonly prismaService: PrismaService,
    readonly producer: AuthProducer,
  ) {}

  create(payload: CreateAuthDto) {
    try {
      return this.prismaService.$transaction(async (tx) => {
        const user = await this.prismaService.user.create({
          data: payload,
        });
        await this.producer.send({
          data: [user],
          event: 'CREATED',
          key: user.id,
        });
        return user;
      });
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all auth`;
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
