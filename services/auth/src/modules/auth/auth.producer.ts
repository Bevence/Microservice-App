import { Kafka } from 'kafkajs';

import { KafkaProducerService } from '../../utilities/kafka/kafka.producer.service';

const TOPIC = {
  AUTH_USER: 'auth.user',
};

export class AuthProducer extends KafkaProducerService {
  readonly topic = TOPIC.AUTH_USER;

  constructor(readonly kafka: Kafka) {
    super(kafka);
  }
}
