import { Module, Provider } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { AuthProducer } from './auth.producer';
import { KafkaService } from 'src/utilities/kafka/kafka.service';
import { KafkaModule } from 'src/utilities/kafka/kafka.module';

const AuthUserProducerFactory: Provider = {
  provide: AuthProducer,
  useFactory: (kafkaService: KafkaService) => {
    return new AuthProducer(kafkaService.getKafkaClient());
  },
  inject: [KafkaService],
};

@Module({
  imports: [KafkaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    PrismaService,
    AuthUserProducerFactory,
  ],
})
export class AuthModule {}
