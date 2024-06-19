import { removeTaskUsecase } from './remove.usecase';
import { TaskRepository } from '../repository.port';

describe('removeTaskUsecase', () => {
  const mockTaskRepository = {
    remove: jest.fn(),
  };

  const usecase = removeTaskUsecase({
    taskRepository: mockTaskRepository as unknown as TaskRepository,
  });

  it('should remove a task successfully', async () => {
    const id = '1';

    mockTaskRepository.remove.mockResolvedValue(undefined);

    const result = await usecase(id);

    expect(result).toEqual(undefined);
  });
});
