import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusMapper } from '@helpers/status-mapper';
import { StatusTask, Task } from '@models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();
  @Output() changeStatus = new EventEmitter<{
    task: Task;
    newStatus: StatusTask;
  }>();

  isEditing = false;
  showDropdown = false;
  editingTaskData: Omit<Task, 'id' | 'status'> = { title: '', description: '' };
  StatusMapper = StatusMapper;
  StatusTask = StatusTask;

  toggleStatusDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  startEditing(): void {
    this.isEditing = true;
    this.editingTaskData = {
      title: this.task.title,
      description: this.task.description,
    };
  }

  saveTask(): void {
    const updatedTask = {
      ...this.task,
      title: this.editingTaskData.title,
      description: this.editingTaskData.description,
    };
    this.editTask.emit(updatedTask);
    this.isEditing = false;
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  delete(): void {
    this.deleteTask.emit(this.task.id);
  }

  changeTaskStatus(newStatus: StatusTask): void {
    this.changeStatus.emit({ task: this.task, newStatus });
  }
}
