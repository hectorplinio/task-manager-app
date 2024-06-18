import { StatusTask, Task } from '@domain/tasks/model';

export interface UpdateTaskInputParams {
  id: string;
  title: string;
  description: string;
  status: StatusTask;
}

export type UpdateTaskUsecase = (data: UpdateTaskInputParams) => Promise<Task>;
