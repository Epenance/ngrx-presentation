import { Todo } from './todo.interfaces';
import { generateId } from '../../util';

export const ADD_TODO = '[Todo] Add todo';
export const DELETE_TODO = '[Todo] Delete todo';
export const TODO_DELETED = '[Todo] Todo deleted';
export const CONFIRM_DELETE_TODO = '[Todo] Show deletion dialog';
export const TODO_DELETE_CANCELED = '[Todo] Canceled todo deletion';
export const TODO_DELETE_DIALOG_CLOSED = '[Todo] Todo delete dialog closed';
export const NO_CONFIRM_DELETE_TODO = '[Todo] Delete todo without confirm dialog';
export const TOGGLE_TODO_DONE = '[Todo] Toggle done status';
export const UPDATE_TODO = '[Todo] Update todo';

export class AddTodo {
  type = ADD_TODO;
  payload: Todo;

  constructor(title: string) {
    this.payload = {
      id: generateId(5),
      title,
      done: false
    };
  }
}

export class DeleteTodo {
  type = DELETE_TODO;
  payload: Todo;

  constructor(todo: Todo) {
    this.payload = todo;
  }
}

export class DeleteTodoWithConfirm {
  type = CONFIRM_DELETE_TODO;
  payload: Todo;

  constructor(todo: Todo) {
    this.payload = todo;
  }
}

export class DeleteTodoWithoutConfirm {
  type = NO_CONFIRM_DELETE_TODO;
  payload: Todo;

  constructor(todo: Todo) {
    this.payload = todo;
  }
}

export class DeleteTodoConfirmed {
  type = TODO_DELETE_DIALOG_CLOSED;
  payload: any;

  constructor(todo: Todo, confirmed: boolean) {
    this.payload = {
      todo,
      confirmed
    };
  }
}

export class TodoDeleteCanceled {
  type = TODO_DELETE_CANCELED;
  payload = '';
}

export class TodoDeleted {
  type = TODO_DELETED;
  payload: Todo;

  constructor(todo: Todo) {
    this.payload = todo;
  }
}

export class ToggleTodoDone {
 type = TOGGLE_TODO_DONE;
 payload: Todo;

 constructor(todo: Todo) {
   this.payload = todo;
 }
}

export class UpdateTodo {
  type = UPDATE_TODO;
  payload: Todo;

  constructor(todo: Todo) {
    this.payload = todo;
  }
}

export type TodoAction =
  | AddTodo
  | DeleteTodo
  | DeleteTodoWithConfirm
  | DeleteTodoWithoutConfirm
  | DeleteTodoConfirmed
  | TodoDeleted
  | ToggleTodoDone
  | TodoDeleteCanceled
  | UpdateTodo;
