import { Request, Response } from 'express';

import { RemoveTaskUsecase } from '@application/tasks/usecases/remove.port';
import { handleControllerError } from '@infra/primary-inputs/shared/handleControllerError';

export interface RemoveTaskContainer {
  removeTaskUsecase: RemoveTaskUsecase;
}

export const removeTaskController = async (req: Request, res: Response) => {
  try {
    const { removeTaskUsecase } = req.container?.cradle as RemoveTaskContainer;

    const { id } = req.params;

    await removeTaskUsecase(id);

    return res.status(200).send();
  } catch (err) {
    handleControllerError(err as Error, res);
  }
};
