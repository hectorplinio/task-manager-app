import { Request, Response } from 'express';

import { CreateTaskUsecase } from '@application/tasks/usecases/create.port';
import { handleControllerError } from '@infra/primary-inputs/shared/handleControllerError';
import { TaskValidator } from '../yup.validator';

export interface CreateTaskContainer {
  createTaskUsecase: CreateTaskUsecase;
  taskValidator: TaskValidator;
}

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const { createTaskUsecase, taskValidator } = req.container
      ?.cradle as CreateTaskContainer;

    const params = await taskValidator.validateCreateTaskInput(req.body);

    const task = await createTaskUsecase(params);

    return res.status(201).json(task);
  } catch (err) {
    handleControllerError(err as Error, res);
  }
};
