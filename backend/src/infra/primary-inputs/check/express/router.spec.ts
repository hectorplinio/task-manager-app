import { checkController } from './check.controller';
import { checkRouter } from './router';

jest.mock('express', () => ({
  Router: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

describe('Check router', () => {
  it('/ route uses checkController', () => {
    expect(checkRouter.get).toHaveBeenCalledWith('/', checkController);
  });
});
