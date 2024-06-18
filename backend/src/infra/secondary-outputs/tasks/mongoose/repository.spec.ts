import { TaskMongooseRepository } from './repository';
import { TaskEntity } from './entity';
import { TaskStatus } from '@domain/tasks/model';

jest.mock('./entity');

describe('TaskMongooseRepository', () => {
  let repository: ReturnType<typeof TaskMongooseRepository>;

  beforeAll(() => {
    repository = TaskMongooseRepository();
  });

  it('should create a task successfully', async () => {
    (TaskEntity.prototype.save as jest.Mock).mockResolvedValue({
      title: 'Test Task',
      description: 'This is a test task description',
    });

    const task = await repository.create({
      id: '1',
      title: 'Test Task',
      description: 'This is a test task description',
      status: TaskStatus.TODO,
    });

    expect(task).toHaveProperty('title', 'Test Task');
    expect(task).toHaveProperty(
      'description',
      'This is a test task description',
    );
  });
});
