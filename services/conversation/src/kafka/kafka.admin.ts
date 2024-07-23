import { Admin } from "kafkajs";
import kafkaClient from "./kafka.client";

export class BaseKafkaAdmin {
  private admin: Admin;
  private topic: string;
  private noOfPartitions: number;

  constructor(topic: string, noOfPartitions: number) {
    this.admin = kafkaClient.admin();
    this.topic = topic;
    this.noOfPartitions = noOfPartitions;
  }

  private async connect() {
    try {
      await this.admin.connect();
    } catch (error) {
      console.log("Error while connecting to kafka", error);
    }
  }

  async createTopic() {
    await this.connect();
    const createdTopics = await this.admin.listTopics();
    if (!createdTopics.includes(this.topic)) {
      const status = await this.admin.createTopics({
        topics: [{ topic: this.topic, numPartitions: this.noOfPartitions }],
      });
      if (status)
        console.log(`🌟 New topic created successfully: "${this.topic}"✨`);
    }
  }
}
