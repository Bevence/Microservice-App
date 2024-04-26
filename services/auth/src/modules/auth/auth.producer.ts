import { User } from '@prisma/client';
import { Kafka } from 'kafkajs';

import { KafkaProducerService } from 'src/utilities/kafka/kafka.producer.service';

const TOPIC = {
  AUTH_USER: 'AUTH_USER',
};

export class AuthProducer extends KafkaProducerService {
  readonly topic = TOPIC.AUTH_USER;

  constructor(readonly kafka: Kafka) {
    super(kafka);
  }
}
