import { Todo } from './todo.interfaces';

export interface TodoState {
  todos: Todo[];
}

export const InitialTodoState: TodoState = {
  todos: []
};
