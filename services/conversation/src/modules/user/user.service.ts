import { KAFKA_EVENT } from "../../kafka/kafka.event";
import { userRepository } from "./user.repository";

const consumeUser = async (payload: any[], event: string) => {
  if (event === KAFKA_EVENT.CREATED || event === KAFKA_EVENT.UPDATED) {
    for (const data of payload) {
      const d = await userRepository.consumeUser(data);
    }
  }
};

export const userService = {
  consumeUser,
};
