import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { StatusTask, Task } from '@models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, provideHttpClientTesting()],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks', () => {
    const dummyTasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        status: StatusTask.TODO,
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        status: StatusTask.DONE,
      },
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });

  it('should create a task', () => {
    const newTask: Task = {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: StatusTask.TODO,
    };

    service.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/tasks`);
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should update a task', () => {
    const updatedTask: Task = {
      id: '1',
      title: 'Updated Task',
      description: 'Updated Description',
      status: StatusTask.DONE,
    };

    service.updateTask(updatedTask).subscribe((task) => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/tasks/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    const taskId = '1';

    service.deleteTask(taskId).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/tasks/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
