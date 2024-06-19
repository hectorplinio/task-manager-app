import { CreateTaskUsecase } from '@application/tasks/usecases/create.port';
import { createTaskUsecase } from '@application/tasks/usecases/create.usecase';
import {
  TaskValidator,
  TaskYupValidator,
} from '@infra/primary-inputs/tasks/yup.validator';
import { TaskMongooseRepository } from '@infra/secondary-outputs/tasks/mongoose/repository';
import { asFunction, AwilixContainer, createContainer } from 'awilix';
import { HandleValidation, IHandleValidation } from '@infra/shared/yup/index';
import { GetAllTasksUsecase } from '@application/tasks/usecases/getAll.port';
import { getAllTasksUsecase } from '@application/tasks/usecases/getAll.usecase';
import { UpdateTaskUsecase } from '@application/tasks/usecases/update.port';
import { updateTaskUsecase } from '@application/tasks/usecases/update.usecase';
import { RemoveTaskUsecase } from '@application/tasks/usecases/remove.port';
import { removeTaskUsecase } from '@application/tasks/usecases/remove.usecase';

interface Cradle {
  taskRepository: ReturnType<typeof TaskMongooseRepository>;
  createTaskUsecase: CreateTaskUsecase;
  getAllTasksUsecase: GetAllTasksUsecase;
  updateTaskUsecase: UpdateTaskUsecase;
  removeTaskUsecase: RemoveTaskUsecase;
  taskValidator: TaskValidator;
  handleValidation: IHandleValidation;
}

const container: AwilixContainer<Cradle> = createContainer();

container.register({
  taskRepository: asFunction(TaskMongooseRepository).singleton(),
  createTaskUsecase: asFunction(createTaskUsecase),
  taskValidator: asFunction(TaskYupValidator).singleton(),
  handleValidation: asFunction(HandleValidation).singleton(),
  getAllTasksUsecase: asFunction(getAllTasksUsecase),
  updateTaskUsecase: asFunction(updateTaskUsecase),
  removeTaskUsecase: asFunction(removeTaskUsecase),
});

export { container };
