import { KAFKA_EVENT } from './kafka.event';

export interface IMessagePayload<T> {
  key: string;
  data: T[];
  event: keyof typeof KAFKA_EVENT;
}
