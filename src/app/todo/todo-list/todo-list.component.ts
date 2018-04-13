import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddTodo, DeleteTodo, ToggleTodoDone } from '../store/todo.actions';
import { State } from '../../store.init';
import { Todo } from '../store/todo.interfaces';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<State>) {
    this.todos$ = this.store.select(state => state.todos.todos);
  }

  ngOnInit() {
  }

  addTodo(input) {
    this.store.dispatch(new AddTodo(input.value));

    input.value = '';
  }

  toggleDone(todo: Todo) {
    this.store.dispatch(new ToggleTodoDone(todo));
  }

  deleteTodo(todo) {
    this.store.dispatch(new DeleteTodo(todo));
  }

}
