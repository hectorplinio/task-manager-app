import { Request, Response } from 'express';

export const checkController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    res.send({ result: 'OK' });
  } catch (error) {
    // TODO: Create a handler to manage the errors
  }
};
