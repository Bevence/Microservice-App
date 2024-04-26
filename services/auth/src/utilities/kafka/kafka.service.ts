import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka, Producer, logLevel } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  // private producer: Producer
  // private consumer: Consumer

  constructor(readonly configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: 'auth_service',
      brokers: this.configService.get('KAFKA_HOST').split(','),
      logLevel: logLevel.ERROR,
    });
    // this.producer = this.kafka.producer()
    // this.consumer = this.kafka.consumer({
    //   groupId:
    // })
  }

  getKafkaClient() {
    return this.kafka;
  }

  // onModuleInit() {
  //   console.log('config', this.configService.get('KAFKA_HOST').split(','));
  //   const kafkaInstance = this.getKafkaClient();
  //   console.log('kafkaInstance', kafkaInstance);
  // }
}
