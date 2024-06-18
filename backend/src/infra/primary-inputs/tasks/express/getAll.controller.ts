import { Request, Response } from 'express';

import { handleControllerError } from '@infra/primary-inputs/shared/handleControllerError';
import { GetAllTasksUsecase } from '@application/tasks/usecases/getAll.port';

export interface GetAllTasksContainer {
  getAllTasksUsecase: GetAllTasksUsecase;
}

export const getAllTasksController = async (req: Request, res: Response) => {
  try {
    const { getAllTasksUsecase } = req.container
      ?.cradle as GetAllTasksContainer;

    const tasks = await getAllTasksUsecase();

    return res.status(200).json(tasks);
  } catch (err) {
    handleControllerError(err as Error, res);
  }
};
