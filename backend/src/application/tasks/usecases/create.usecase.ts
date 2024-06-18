import { TaskRepository } from '../repository.port';
import { CreateTaskInputParams, CreateTaskUsecase } from './create.port';
import { Task, TaskStatus } from '@domain/tasks/model';
import { v4 as uuid } from 'uuid';

export interface CreateTaskProps {
  taskRepository: TaskRepository;
}

export const createTaskUsecase = ({
  taskRepository,
}: CreateTaskProps): CreateTaskUsecase => {
  const run = async (data: CreateTaskInputParams): Promise<Task> => {
    const task = await taskRepository.create({
      id: uuid(),
      title: data.title,
      description: data.description,
      status: TaskStatus.TODO,
    });
    return task;
  };
  return run;
};
