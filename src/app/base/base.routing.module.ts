import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }, {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Ngrx | Jest' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: []
})
export class BaseRouting {}
