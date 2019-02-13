import { Topic } from './topic';
import {Subject} from './subject';

export interface Lesson {
  id: string;
  name: string;
  topic: Topic;
  timeToNowDifference: number;
  subject: Subject;
}
