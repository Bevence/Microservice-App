import { Consumer } from "kafkajs";
import kafkaClient from "./kafka.client";

export class BaseConsumer {
  private consumer: Consumer;
  private topic: string;

  constructor(topic: string) {
    this.consumer = kafkaClient.consumer({
      groupId: "conversation-consumer",
    });
    this.topic = topic;
  }

  private async connect() {
    try {
      await this.consumer.connect();
    } catch (error) {
      console.log("Error while connecting to kafka", error);
    }
  }

  async listen() {
    await this.connect();
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });

    // await this.consumer.run({
    //     eachMessage: async ({ topic, partition, message }) => {
    //       console.log({
    //         value: message.value.toString(),
    //       })
    //     },
    //   })
    console.log(`🌟 Kafka consumer listeninig to Topic: ${this.topic}✨`);
  }
}
