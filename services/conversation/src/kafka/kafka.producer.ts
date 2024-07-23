import { Partitioners, Producer } from "kafkajs";
import { IMessagePayload } from "./kafka.interface";
import kafkaClient from "./kafka.client";

export class BaseProducer {
  private producer: Producer;
  private topic: string;

  constructor(topic: string) {
    this.producer = kafkaClient.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });
    this.topic = topic;
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (error) {
      console.log("Error while connecting to kafka", error);
    }
  }

  async send<T>(payload: IMessagePayload<T>) {
    await this.connect();

    const { key, ...rest } = payload;

    await this.producer.send({
      topic: this.topic,
      messages: [{ key: key, value: JSON.stringify(rest) }],
    });
    console.log(
      `🌟 New message for topic "${this.topic}" 📩: ${JSON.stringify(rest)} ✨`
    );
  }
}
