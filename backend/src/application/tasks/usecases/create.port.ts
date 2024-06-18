import { Task } from '@domain/tasks/model';

export interface CreateTaskInputParams {
  title: string;
  description: string;
}

export type CreateTaskUsecase = (data: CreateTaskInputParams) => Promise<Task>;
