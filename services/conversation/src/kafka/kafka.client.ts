import { Kafka } from "kafkajs";
import { kafkaConfig } from "../config";

console.log("first", kafkaConfig.kafkaHost?.split(",") || []);

const kafka = new Kafka({
  clientId: "conversation",
  brokers: kafkaConfig.kafkaHost?.split(",") || [],
});

export default kafka;
