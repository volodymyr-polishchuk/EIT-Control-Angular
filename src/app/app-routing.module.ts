import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LessonsComponent} from './components/pages/lessons/lessons.component';
import {ResultsComponent} from './components/pages/results/results.component';
import {StatisticsComponent} from './components/pages/statistics/statistics.component';
import {LoginComponent} from './components/pages/login/login.component';
import {MainContainerComponent} from './components/pages/main-container/main-container.component';

const routes: Routes = [
  { path: '', redirectTo: 'student', pathMatch: 'full' },
  { path: 'student',
    component: MainContainerComponent,
    children: [
      { path: '', redirectTo: 'lessons', pathMatch: 'full' },
      { path: 'lessons', component: LessonsComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'settings', component: StatisticsComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
