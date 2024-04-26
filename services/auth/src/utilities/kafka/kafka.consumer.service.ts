// import { Consumer, Kafka, Producer } from 'kafkajs';
// import { KafkaService } from './kafka.service';

// export class KafkaConsumerService {
//   private readonly kafka: Kafka;
//   private readonly consumer: Consumer;

//   constructor(readonly kafkaService: KafkaService) {
//     this.kafka = kafkaService.getKafkaClient();
//     this.consumer = this.kafka.consumer({});
//   }

//   async connect() {
//     try {
//       await this.consumer.connect();
//     } catch (error) {
//       console.log('Error while connecting to kafka', error);
//     }
//   }

//   async consume(topic: string, message: any) {
//     await this.consumer.send({ topic, messages: [message] });
//   }

//   async disconnect() {
//     await this.consumer.disconnect();
//   }
// }
