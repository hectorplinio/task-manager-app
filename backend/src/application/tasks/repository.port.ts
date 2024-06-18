import { Task } from '@domain/tasks/model';

export interface TaskRepository {
  create: (data: Task) => Promise<Task>;
  getAll: () => Promise<Task[]>;
  update: (data: Task) => Promise<Task>;
}
