import { TaskRepository } from '../repository.port';
import { Task, TaskStatus } from '@domain/tasks/model';
import { getAllTasksUsecase } from './getAll.usecase';

describe('getAllTasksUsecase', () => {
  const mockTaskRepository = {
    getAll: jest.fn(),
  };

  const usecase = getAllTasksUsecase({
    taskRepository: mockTaskRepository as unknown as TaskRepository,
  });

  it('should getAll tasks successfully', async () => {
    const getAllTasks = [
      {
        id: 'uuid',
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.TODO,
      },
    ];

    mockTaskRepository.getAll.mockResolvedValue(getAllTasks);

    const result = await usecase();

    expect(result).toEqual(getAllTasks);
  });

  it('should getAll return empty array', async () => {
    const getAllTasks: Task[] = [];

    mockTaskRepository.getAll.mockResolvedValue(getAllTasks);

    const result = await usecase();

    expect(result).toEqual(getAllTasks);
  });
});
