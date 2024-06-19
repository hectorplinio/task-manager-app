import { createTaskController } from './create.controller';
import { getAllTasksController } from './getAll.controller';
import { removeTaskController } from './remove.controller';
import { taskRouter } from './router';
import { updateTaskController } from './update.controller.';

jest.mock('express', () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

describe('Task router', () => {
  it('/ route uses createTaskController', () => {
    expect(taskRouter.post).toHaveBeenCalledWith('/', createTaskController);
  });

  it('/ route uses getAllTasksController', () => {
    expect(taskRouter.get).toHaveBeenCalledWith('/', getAllTasksController);
  });

  it('/ route uses updateTaskController', () => {
    expect(taskRouter.put).toHaveBeenCalledWith('/', updateTaskController);
  });

  it('/ route uses removeTaskController', () => {
    expect(taskRouter.delete).toHaveBeenCalledWith('/', removeTaskController);
  });
});
