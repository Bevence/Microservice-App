import { BaseKafkaAdmin } from "./kafka.admin";
import { CONSUMER_TOPICS } from "./kafka.topics";

const kafkaTopicCreator = () => {
  new BaseKafkaAdmin(CONSUMER_TOPICS.AUTH_USER, 2).createTopic();
};

export default kafkaTopicCreator;
