import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [TodoListComponent, DeleteDialogComponent],
  exports: [TodoListComponent],
  entryComponents: [ DeleteDialogComponent ]
})
export class TodoModule { }
