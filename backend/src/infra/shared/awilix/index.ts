import { CreateTaskUsecase } from '@application/tasks/usecases/create.port';
import { createTaskUsecase } from '@application/tasks/usecases/create.usecase';
import {
  TaskValidator,
  TaskYupValidator,
} from '@infra/primary-inputs/tasks/yup.validator';
import { TaskMongooseRepository } from '@infra/secondary-outputs/tasks/mongoose/repository';
import { asFunction, AwilixContainer, createContainer } from 'awilix';
import { HandleValidation, IHandleValidation } from '@infra/shared/yup/index';

interface Cradle {
  taskRepository: ReturnType<typeof TaskMongooseRepository>;
  createTaskUsecase: CreateTaskUsecase;
  taskValidator: TaskValidator;
  handleValidation: IHandleValidation;
}

const container: AwilixContainer<Cradle> = createContainer();

container.register({
  taskRepository: asFunction(TaskMongooseRepository).singleton(),
  createTaskUsecase: asFunction(createTaskUsecase),
  taskValidator: asFunction(TaskYupValidator).singleton(),
  handleValidation: asFunction(HandleValidation).singleton(),
});

export { container };
