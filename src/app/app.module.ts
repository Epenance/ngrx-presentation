import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { TodoModule } from './todo/todo.module';
import { combinedReducers } from './store.init';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo/store/todo.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(combinedReducers),
    EffectsModule.forRoot([TodoEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TodoModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
