import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LessonItemComponent } from './components/pages/lessons/lesson-item/lesson-item.component';
import { CreateLessonComponent } from './components/pages/lessons/create-lesson/create-lesson.component';
import { ActiveLessonsComponent } from './components/pages/lessons/active-lessons/active-lessons.component';
import { HintComponent } from './components/pages/lessons/hint/hint.component';
import { LessonsComponent } from './components/pages/lessons/lessons.component';
import { AppRoutingModule } from './app-routing.module';
import { ResultsComponent } from './components/pages/results/results.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';
import { SearchFieldsComponent } from './components/pages/results/search-fields/search-fields.component';
import { SearchResultsComponent } from './components/pages/results/search-results/search-results.component';
import { ResultItemComponent } from './components/pages/results/search-results/result-item/result-item.component';
import { HttpClientModule } from '@angular/common/http';
import { MiniButtonComponent } from './components/shared/mini-button/mini-button.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LessonItemComponent,
    CreateLessonComponent,
    ActiveLessonsComponent,
    HintComponent,
    LessonsComponent,
    ResultsComponent,
    StatisticsComponent,
    SearchFieldsComponent,
    SearchResultsComponent,
    ResultItemComponent,
    MiniButtonComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCheckboxModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
