import { TaskRepository } from '../repository.port';
import { Task } from '@domain/tasks/model';
import { GetAllTasksUsecase } from './getAll.port';

export interface GetAllTasksProps {
  taskRepository: TaskRepository;
}

export const getAllTasksUsecase = ({
  taskRepository,
}: GetAllTasksProps): GetAllTasksUsecase => {
  const run = async (): Promise<Task[]> => {
    const tasks = await taskRepository.getAll();
    return tasks;
  };
  return run;
};
