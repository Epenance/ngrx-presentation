import { TodoState } from './todo/store/todo.state';
import { todoReducer } from './todo/store/todo.reducer';

export interface State {
  todos: TodoState;
}

export const combinedReducers = {
  todos: todoReducer
};
