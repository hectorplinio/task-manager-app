import { createTaskController } from './create.controller';
import { taskRouter } from './router';

jest.mock('express', () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
  })),
}));

describe('Task router', () => {
  it('/ route uses createTaskController', () => {
    expect(taskRouter.post).toHaveBeenCalledWith('/', createTaskController);
  });
});
