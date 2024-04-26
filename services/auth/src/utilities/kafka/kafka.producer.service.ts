import { Kafka, Partitioners, Producer } from 'kafkajs';
import { IMessagePayload } from './kafka.interface';
import { Logger } from '@nestjs/common';

export abstract class KafkaProducerService {
  protected readonly producer: Producer;
  private logger: Logger;

  abstract topic: string;

  constructor(kafka: Kafka) {
    this.producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });
    this.logger = new Logger();
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (error) {
      console.log('Error while connecting to kafka', error);
    }
  }

  async send<T>(payload: IMessagePayload<T>) {
    await this.connect();

    const { key, ...rest } = payload;

    await this.producer.send({
      topic: this.topic,
      messages: [{ key: key, value: JSON.stringify(rest) }],
    });
    this.logger.log(
      `🌟 New message for topic "${this.topic}" 📩: ${JSON.stringify(rest)} ✨`,
    );
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
