import { Consumer } from "kafkajs";
import kafkaClient from "../kafka.client";
import { userService } from "../../modules/user";

export class AuthConsumer {
  private consumer: Consumer;
  private topic: string;

  constructor(topic: string) {
    this.consumer = kafkaClient.consumer({
      groupId: "conversation.auth",
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
    console.log(`🌟 Kafka consumer listeninig to Topic: ${this.topic}✨`);

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const encodedData = message.value?.toString() || "";
        const { data, event } = JSON.parse(encodedData);
        try {
          await userService.consumeUser(data, event);
          console.log(`Consumed data from ${this.topic} successfully`);
        } catch (error) {
          throw error;
        }
      },
    });
  }
}
