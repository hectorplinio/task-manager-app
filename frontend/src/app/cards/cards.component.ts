import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task, StatusTask } from '../task.service';
import { FormsModule } from '@angular/forms';
import { StatusMapper } from './status-mapper';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  tasks: Task[] = [];
  addingTask = false;
  newTask: Omit<Task, 'id' | 'status'> = { title: '', description: '' };
  editingTask: string | null = null;
  editingTaskData: Omit<Task, 'id' | 'status'> = { title: '', description: '' };
  statusDropdown: string | null = null;
  StatusMapper = StatusMapper;
  StatusTask = StatusTask;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addNewTask(): void {
    this.addingTask = true;
    this.newTask = { title: '', description: '' };
  }

  cancelNewTask(): void {
    this.addingTask = false;
    this.newTask = { title: '', description: '' };
  }

  createTask(): void {
    if (!this.newTask.title || !this.newTask.description) {
      return;
    }
    this.taskService.createTask({ ...this.newTask }).subscribe(() => {
      this.loadTasks();
      this.addingTask = false;
    });
  }

  startEditing(task: Task): void {
    this.editingTask = task.id;
    this.editingTaskData = { title: task.title, description: task.description };
  }

  saveTask(task: Task): void {
    const updatedTask = {
      ...task,
      title: this.editingTaskData.title,
      description: this.editingTaskData.description,
    };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.loadTasks();
      this.editingTask = null;
    });
  }

  cancelEditing(): void {
    this.editingTask = null;
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  toggleStatusDropdown(task: Task): void {
    this.statusDropdown = this.statusDropdown === task.id ? null : task.id;
  }

  changeTaskStatus(task: Task, newStatus: StatusTask): void {
    const updatedTask = { ...task, status: newStatus };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.loadTasks();
      this.statusDropdown = null;
    });
  }
}
