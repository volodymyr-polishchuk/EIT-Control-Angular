import { Topic } from './topic';

export interface Lesson {
  id: string;
  name: string;
  topic: Topic;
  timeToNowDifference: number;
}
