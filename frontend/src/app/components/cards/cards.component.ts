import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '@services/task.service';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent } from '@components/task-card/task-card.component';
import { StatusTask, Task } from '@models/task.model';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCardComponent],
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit {
  tasks: Task[] = [];
  addingTask = false;
  newTask: Omit<Task, 'id' | 'status'> = { title: '', description: '' };

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

  handleEditTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask).subscribe(() => this.loadTasks());
  }

  handleDeleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  handleChangeStatus({
    task,
    newStatus,
  }: {
    task: Task;
    newStatus: StatusTask;
  }): void {
    const updatedTask = { ...task, status: newStatus };
    this.taskService.updateTask(updatedTask).subscribe(() => this.loadTasks());
  }
}
