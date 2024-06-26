import { createTaskUsecase } from './create.usecase';
import { TaskRepository } from '../repository.port';
import { StatusTask } from '@domain/tasks/model';

describe('createTaskUsecase', () => {
  const mockTaskRepository = {
    create: jest.fn(),
  };

  const usecase = createTaskUsecase({
    taskRepository: mockTaskRepository as unknown as TaskRepository,
  });

  it('should create a task successfully', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
    };

    const createdTask = {
      id: 'uuid',
      title: taskData.title,
      description: taskData.description,
      status: StatusTask.TODO,
    };

    mockTaskRepository.create.mockResolvedValue(createdTask);

    const result = await usecase(taskData);

    expect(result).toEqual(createdTask);
    expect(mockTaskRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(taskData),
    );
  });
});
