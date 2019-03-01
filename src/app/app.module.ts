import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {NavBarComponent} from './components/shared/nav-bar/nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LessonItemComponent} from './components/pages/lessons/lesson-item/lesson-item.component';
import {CreateLessonComponent} from './components/pages/lessons/create-lesson/create-lesson.component';
import {ActiveLessonsComponent} from './components/pages/lessons/active-lessons/active-lessons.component';
import {HintComponent} from './components/pages/lessons/hint/hint.component';
import {LessonsComponent} from './components/pages/lessons/lessons.component';
import {AppRoutingModule} from './app-routing.module';
import {ResultsComponent} from './components/pages/results/results.component';
import {StatisticsComponent} from './components/pages/statistics/statistics.component';
import {SearchFieldsComponent} from './components/pages/results/search-fields/search-fields.component';
import {SearchResultsComponent} from './components/pages/results/search-results/search-results.component';
import {ResultItemComponent} from './components/pages/results/search-results/result-item/result-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MiniButtonComponent} from './components/shared/mini-button/mini-button.component';
import {JwtInterceptorService} from './components/shared/interceptors/jwt-interceptor.service';
import {StatisticsItemComponent} from './components/pages/statistics/statistics-item/statistics-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/pages/login/login.component';
import {MainContainerComponent} from './components/pages/main-container/main-container.component';
import {HttpErrorInterceptor} from './components/shared/interceptors/error-interceptor.service';
import {SettingsComponent} from './components/pages/settings/settings.component';
import {SubjectsComponent} from './components/pages/settings/subjects/subjects.component';
import {ProfileComponent} from './components/pages/settings/profile/profile.component';
import {SecureComponent} from './components/pages/settings/secure/secure.component';
import {GraphComponent} from './components/pages/statistics/graph/graph.component';
import {SignUpComponent} from './components/pages/sign-up/sign-up.component';


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
    MiniButtonComponent,
    StatisticsItemComponent,
    LoginComponent,
    MainContainerComponent,
    SettingsComponent,
    SubjectsComponent,
    ProfileComponent,
    SecureComponent,
    GraphComponent,
    SignUpComponent
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
    MatSnackBarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
