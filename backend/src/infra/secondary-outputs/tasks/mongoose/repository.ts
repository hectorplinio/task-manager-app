import { StatusTask } from '@domain/tasks/model';
import { TaskEntity } from './entity';
import { EntityNotFoundError } from '@shared/error';

interface CreateProps {
  id: string;
  title: string;
  description: string;
  status: StatusTask;
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

  const update = async (data: CreateProps) => {
    const task = await TaskEntity.findById({ _id: data.id });

    if (!task) {
      throw new EntityNotFoundError('Task not found');
    }
    const newTask = new TaskEntity(data);

    const updatedTask = await newTask.save();

    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
    };
  };

  const remove = async (id: string) => {
    const removedTask = await TaskEntity.findByIdAndDelete({ _id: id });
    if (!removedTask) {
      throw new EntityNotFoundError('Task not found');
    }
    return;
  };

  return { create, getAll, update, remove };
};
