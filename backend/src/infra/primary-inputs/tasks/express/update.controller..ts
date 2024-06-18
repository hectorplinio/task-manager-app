import { Request, Response } from 'express';

import { handleControllerError } from '@infra/primary-inputs/shared/handleControllerError';
import { TaskValidator } from '../yup.validator';
import { UpdateTaskUsecase } from '@application/tasks/usecases/update.port';

export interface UpdateTaskContainer {
  updateTaskUsecase: UpdateTaskUsecase;
  taskValidator: TaskValidator;
}

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { updateTaskUsecase, taskValidator } = req.container
      ?.cradle as UpdateTaskContainer;

    const params = await taskValidator.validateUpdateTaskInput(req.body);

    const updatedTask = await updateTaskUsecase(params);

    return res.status(200).json(updatedTask);
  } catch (err) {
    handleControllerError(err as Error, res);
  }
};
