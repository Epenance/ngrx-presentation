import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MatDialog } from '@angular/material';
import {
  ADD_TODO,
  CONFIRM_DELETE_TODO,
  DELETE_TODO,
  DeleteTodo,
  DeleteTodoConfirmed,
  DeleteTodoWithConfirm,
  DeleteTodoWithoutConfirm,
  NO_CONFIRM_DELETE_TODO,
  TODO_DELETE_DIALOG_CLOSED,
  TODO_DELETED, TodoDeleteCanceled,
  TodoDeleted,
  TOGGLE_TODO_DONE,
  ToggleTodoDone,
  UpdateTodo
} from './todo.actions';
import { filter, first, flatMap, map, zip } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { State } from '../../store.init';
import { Store } from '@ngrx/store';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';


@Injectable()
export class TodoEffects {

  /**
   * Example of a event handler
   * @type {Observable<{type: string}>}
   */
  @Effect()
  logMessage = this.actions.ofType(ADD_TODO, TOGGLE_TODO_DONE, TODO_DELETED).pipe(
    map((action: any) => {
      console.log(`${action.type}: `, action.payload);

      return {
        type: '[Log] Logged message'
      };
    })
  );

  /**
   * Example of an enricher
   * @type {Observable<UpdateTodo>}
   */
  @Effect()
  toggleTodoDone = this.actions.ofType(TOGGLE_TODO_DONE).pipe(
    map((action: ToggleTodoDone) => {
      const newTodo = {
        ...action.payload,
        done: !action.payload.done
      };

      return new UpdateTodo(newTodo);
    })
  );

  /**
   * Example of a context-decider (Based on the environment)
   * We can disable / enable confirm dialogs before deletion
   * @type {Observable<DeleteTodoWithConfirm | DeleteTodoWithoutConfirm>}
   */
  @Effect()
  deleteTodo = this.actions.ofType(DELETE_TODO).pipe(
    map((action: DeleteTodo) => {
      if (environment.showConfirmDialogs) {
        const dialogRef = this.dialog.open(DeleteDialogComponent, action.payload);

        dialogRef.beforeClose().subscribe((res: boolean) => {
          this.store.dispatch(new DeleteTodoConfirmed(action.payload, res));
        });

        return new DeleteTodoWithConfirm(action.payload);
      } else {
        return new DeleteTodoWithoutConfirm(action.payload);
      }
    })
  );

  /**
   * Example of waiting for a confirm message from our dialog before doing anything.
   * @type {Observable<TodoDeleted>}
   */
 @Effect()
  deleteConfirm = this.actions.ofType(CONFIRM_DELETE_TODO).pipe(
    flatMap((a: any) => ArrayObservable.of(a).pipe(
      zip(
        this.actions.pipe(filter((t: any) => {
          return t.type === TODO_DELETE_DIALOG_CLOSED && t.payload.todo.id === a.payload.id;
        }), first()),
      )
    )),
    map(pair => {
      if (pair[1].payload.confirmed) {
        return new TodoDeleted(pair[0].payload);
      } else {
        return new TodoDeleteCanceled();
      }
    })
  );

  /**
   * Simply deletes a message without confirmation
   * @type {Observable<TodoDeleted>}
   */
 @Effect()
 deleteWithoutConfirm = this.actions.ofType(NO_CONFIRM_DELETE_TODO).pipe(
   map((action: DeleteTodoWithoutConfirm) => {
     return new TodoDeleted(action.payload);
   })
 );

  constructor(private actions: Actions, private dialog: MatDialog, private store: Store<State>) {}


}
