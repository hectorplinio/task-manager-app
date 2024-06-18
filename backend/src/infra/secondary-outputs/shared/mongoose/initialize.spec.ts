import mongoose from 'mongoose';
import { initializeDatabaseConnection } from './initializer';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    host: 'localhost',
  },
}));

describe('initializeDatabaseConnection', () => {
  it('should connect to MongoDB successfully', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce({
      connection: { host: 'localhost' },
    });

    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    await initializeDatabaseConnection();

    expect(mongoose.connect).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
    );
    expect(logSpy).toHaveBeenCalledWith('MongoDB Connected: localhost');

    logSpy.mockRestore();
  });

  it('should handle connection error', async () => {
    const error = new Error('Connection error');
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(error);

    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const exitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation((code?: string | number | null | undefined) => {
        throw new Error(`process.exit: ${code}`);
      });

    await expect(initializeDatabaseConnection()).rejects.toThrow(
      'process.exit: 1',
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Error: DB not initizalized Error: Connection error',
    );

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
