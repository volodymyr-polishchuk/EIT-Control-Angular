import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LessonsComponent} from './components/pages/lessons/lessons.component';
import {ResultsComponent} from './components/pages/results/results.component';
import {StatisticsComponent} from './components/pages/statistics/statistics.component';
import {LoginComponent} from './components/pages/login/login.component';
import {MainContainerComponent} from './components/pages/main-container/main-container.component';
import {SettingsComponent} from './components/pages/settings/settings.component';
import {SubjectsComponent} from './components/pages/settings/subjects/subjects.component';
import {ProfileComponent} from './components/pages/settings/profile/profile.component';
import {SecureComponent} from './components/pages/settings/secure/secure.component';
import {SignUpComponent} from './components/pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'student', pathMatch: 'full' },
  {
    path: 'student',
    component: MainContainerComponent,
    children: [
      { path: '', redirectTo: 'lessons', pathMatch: 'full' },
      { path: 'lessons', component: LessonsComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'statistics', component: StatisticsComponent },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: ProfileComponent },
          { path: 'subjects', component: SubjectsComponent },
          { path: 'secure', component: SecureComponent },
        ]
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
