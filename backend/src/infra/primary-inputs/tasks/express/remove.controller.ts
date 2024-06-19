import { Request, Response } from 'express';

import { RemoveTaskUsecase } from '@application/tasks/usecases/remove.port';
import { handleControllerError } from '@infra/primary-inputs/shared/handleControllerError';
import { TaskValidator } from '../yup.validator';

export interface RemoveTaskContainer {
  removeTaskUsecase: RemoveTaskUsecase;
  taskValidator: TaskValidator;
}

export const removeTaskController = async (req: Request, res: Response) => {
  try {
    const { removeTaskUsecase, taskValidator } = req.container
      ?.cradle as RemoveTaskContainer;

    const { id } = await taskValidator.validateRemoveTaskInput(req.body);

    await removeTaskUsecase(id);

    return res.status(200).send();
  } catch (err) {
    handleControllerError(err as Error, res);
  }
};
