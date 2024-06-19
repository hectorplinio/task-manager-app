import { TaskRepository } from '../repository.port';
import { RemoveTaskUsecase } from './remove.port';

export interface RemoveTaskProps {
  taskRepository: TaskRepository;
}

export const removeTaskUsecase = ({
  taskRepository,
}: RemoveTaskProps): RemoveTaskUsecase => {
  const run = async (id: string): Promise<void> => {
    return await taskRepository.remove(id);
  };
  return run;
};
