import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsComponent } from './cards.component';
import { TaskService } from '@services/task.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Task, StatusTask } from '@models/task.model';
import { of } from 'rxjs';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let service: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsComponent],
      imports: [],
      providers: [TaskService, provideHttpClientTesting()],
    }).compileComponents();

    service = TestBed.inject(TaskService);
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
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

    spyOn(service, 'getTasks').and.returnValue(of(dummyTasks));
    component.ngOnInit();
    expect(component.tasks).toEqual(dummyTasks);
  });
});
