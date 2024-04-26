import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { PrismaModule } from './utilities/prisma/prisma.module';
import { KafkaModule } from './utilities/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    PrismaModule,
    KafkaModule,
    AuthModule,
    // UsersModule,
  ],
})
export class AppModule {}
