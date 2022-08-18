import { TaskStatus } from '../task.model';

export class FilterTasksDto {
  search: string;
  status: TaskStatus;
}
