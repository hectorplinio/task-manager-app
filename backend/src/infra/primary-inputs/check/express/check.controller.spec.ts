import { Request, Response } from 'express';
import { checkController } from './check.controller';

jest.mock('express', () => ({
  Router: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

describe('Check controller', () => {
  it('Request correctly managed', () => {
    const body = { data: 'data' };
    const mockReq = {
      body,
    } as unknown as Request;
    const mockRes = {
      status: jest.fn().mockImplementation(() => mockRes),
      send: jest.fn(),
    } as unknown as Response;

    checkController(mockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith({ result: 'OK' });
  });

  it('Request error', () => {
    const body = { data: 'data' };
    const mockReq = {
      body,
    } as unknown as Request;
    const mockRes = {
      status: jest.fn().mockImplementation(() => ({
        send: jest.fn(),
      })),
    } as unknown as Response;

    checkController(mockReq, mockRes);
  });
});
