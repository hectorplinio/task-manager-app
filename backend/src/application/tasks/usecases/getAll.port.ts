import { Task } from '@domain/tasks/model';

export type GetAllTasksUsecase = () => Promise<Task[]>;
