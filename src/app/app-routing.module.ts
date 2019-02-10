import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonsComponent } from './components/pages/lessons/lessons.component';
import { ResultsComponent } from './components/pages/results/results.component';
import { SettingsComponent } from './components/pages/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'lessons', pathMatch: 'full' },
  { path: 'lessons', component: LessonsComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
