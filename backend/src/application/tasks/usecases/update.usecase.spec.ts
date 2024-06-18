import { updateTaskUsecase } from './update.usecase';
import { TaskRepository } from '../repository.port';
import { StatusTask } from '@domain/tasks/model';

describe('updateTaskUsecase', () => {
  const mockTaskRepository = {
    update: jest.fn(),
  };

  const usecase = updateTaskUsecase({
    taskRepository: mockTaskRepository as unknown as TaskRepository,
  });

  it('should update a task successfully', async () => {
    const taskData = {
      id: 'uuid',
      title: 'Test Task',
      description: 'Test Description',
      status: StatusTask.IN_PROGRESS,
    };

    const updatedTask = {
      id: 'uuid',
      title: taskData.title,
      description: taskData.description,
      status: StatusTask.IN_PROGRESS,
    };

    mockTaskRepository.update.mockResolvedValue(updatedTask);

    const result = await usecase(taskData);

    expect(result).toEqual(taskData);
    expect(mockTaskRepository.update).toHaveBeenCalledWith(
      expect.objectContaining(taskData),
    );
  });
});
