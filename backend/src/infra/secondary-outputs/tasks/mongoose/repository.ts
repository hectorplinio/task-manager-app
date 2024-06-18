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
    const savedTasks = await task.save();
    return {
      id: savedTasks.id,
      title: savedTasks.title,
      description: savedTasks.description,
      status: savedTasks.status,
    };
  };

  const getAll = async () => {
    const tasks = await TaskEntity.find();
    return tasks.map((task) => {
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      };
    });
  };

  return { create, getAll };
};
