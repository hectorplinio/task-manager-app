import { TaskStatus } from '@domain/tasks/model';
import { TaskEntity } from './entity';

interface CreateProps {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export const TaskMongooseRepository = () => {
  const create = async (data: CreateProps) => {
    const task = new TaskEntity(data);
    return await task.save();
  };

  return { create };
};
