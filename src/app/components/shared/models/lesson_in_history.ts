import { Subject } from './subject';
import { Topic } from './topic';

export interface LessonInHistory {
  dateStart: Date;
  dateEnd: Date;
  subject: Subject;
  topic: Topic;
  time: number;
}
