import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';
import { FormsModule } from '@angular/forms';
import { Task, StatusTask } from '@models/task.model';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCardComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with input task', () => {
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: StatusTask.TODO,
    };
    component.task = task;
    fixture.detectChanges();
    expect(component.task).toEqual(task);
  });

  it('should emit edit event', () => {
    spyOn(component.editTask, 'emit');
    component.task = {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: StatusTask.TODO,
    };
    component.startEditing();
    expect(component.editTask.emit).toHaveBeenCalledWith(component.task);
  });
});
