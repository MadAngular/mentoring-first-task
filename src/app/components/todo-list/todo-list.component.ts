import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Todo } from '../../Interfaces/todo-interface';
import { TodoApiComponent } from '../../services/todo-api.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TodoCardComponent } from './todo-cards/todo-card.component';
import { TodoUserComponent } from '../../services/todo.service.component';
import { UserFormComponent } from '../forms/user-form/user-form.component';
import { TodoFormComponents } from "../forms/create-todo-form/create-todo-form.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, UserFormComponent, TodoFormComponents],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  
  apiService = inject(TodoApiComponent);
  todoService = inject(TodoUserComponent);
  todos = this.todoService;

  constructor() {
    this.apiService.getTodo().subscribe((response) => {
      this.todoService.setTodo(response);
    });
  }

  deleteTodo(id: string) {
    this.todoService.deletedTodo(id);
  }
  
  createTodo(todo: Todo){
    this.todoService.createTodo({
      userId: todo.userId,
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    })
  }
  
}

