import { createTaskController } from './create.controller';
import { getAllTasksController } from './getAll.controller';
import { taskRouter } from './router';

jest.mock('express', () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
  })),
}));

describe('Task router', () => {
  it('/ route uses createTaskController', () => {
    expect(taskRouter.post).toHaveBeenCalledWith('/', createTaskController);
  });

  it('/ route uses getAllTasksController', () => {
    expect(taskRouter.get).toHaveBeenCalledWith('/', getAllTasksController);
  });
});
