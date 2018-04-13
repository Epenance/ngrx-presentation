import { ADD_TODO, DELETE_TODO, TODO_DELETED, TodoAction, UPDATE_TODO } from './todo.actions';
import {InitialTodoState, TodoState} from './todo.state';

export function todoReducer(state: TodoState = InitialTodoState, action: TodoAction) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload
        ]
      };
    }

    case UPDATE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return action.payload.id === todo.id ? action.payload : todo;
        })
      };
    }

    case TODO_DELETED: {
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo.title !== action.payload.title;
        })
      };
    }

    default: {
      return state;
    }
  }
}
