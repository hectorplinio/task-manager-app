import { TaskRepository } from '../repository.port';
import { UpdateTaskInputParams, UpdateTaskUsecase } from './update.port';
import { Task } from '@domain/tasks/model';

export interface UpdateTaskProps {
  taskRepository: TaskRepository;
}

export const updateTaskUsecase = ({
  taskRepository,
}: UpdateTaskProps): UpdateTaskUsecase => {
  const run = async (data: UpdateTaskInputParams): Promise<Task> => {
    const task = await taskRepository.update({
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status,
    });
    return task;
  };
  return run;
};
