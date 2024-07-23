import { AuthConsumer } from "./consumer/auth.consumer";
import { CONSUMER_TOPICS } from "./kafka.topics";

const kafkaTopicListner = () => {
  new AuthConsumer(CONSUMER_TOPICS.AUTH_USER).listen();
};

export default kafkaTopicListner;
