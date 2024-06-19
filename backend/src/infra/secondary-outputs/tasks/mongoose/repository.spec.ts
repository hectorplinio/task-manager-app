import { TaskMongooseRepository } from './repository';
import { TaskEntity } from './entity';
import { StatusTask } from '@domain/tasks/model';

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
      status: StatusTask.TODO,
    });

    expect(task).toHaveProperty('title', 'Test Task');
    expect(task).toHaveProperty(
      'description',
      'This is a test task description',
    );
  });

  it('should get all tasks successfully', async () => {
    (TaskEntity.find as jest.Mock).mockResolvedValue([
      {
        title: 'Test Task',
        description: 'This is a test task description',
      },
    ]);

    const tasks = await repository.getAll();

    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toHaveProperty('title', 'Test Task');
    expect(tasks[0]).toHaveProperty(
      'description',
      'This is a test task description',
    );
  });

  it('should update a task successfully', async () => {
    (TaskEntity.findById as jest.Mock).mockResolvedValue({
      id: '1',
      title: 'Test Task',
      description: 'This is a test task description',
      status: StatusTask.TODO,
    });

    const task = await repository.update({
      id: '1',
      title: 'Test Task',
      description: 'This is a test task description',
      status: StatusTask.TODO,
    });

    expect(task).toHaveProperty('title', 'Test Task');
    expect(task).toHaveProperty(
      'description',
      'This is a test task description',
    );
  });

  it('should remove a task successfully', async () => {
    (TaskEntity.findByIdAndDelete as jest.Mock).mockResolvedValue({
      id: '1',
      title: 'Test Task',
      description: 'This is a test task description',
      status: StatusTask.TODO,
    });

    expect(await repository.remove('1')).toEqual(undefined);
  });

  it('should throw an error when task is not found', async () => {
    (TaskEntity.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      repository.update({
        id: '1',
        title: 'Test Task',
        description: 'This is a test task description',
        status: StatusTask.TODO,
      }),
    ).rejects.toThrow('Task not found');
  });
});
