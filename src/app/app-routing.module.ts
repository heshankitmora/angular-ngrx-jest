import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './base/base-layout/base-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  }, {
    path: 'main',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./base/base.module').then((m) => m.BaseModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
   })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
