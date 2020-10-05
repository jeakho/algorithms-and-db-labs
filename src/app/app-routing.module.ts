import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Lab2Component } from './lab2/lab2.component'
import { Lab3Component } from './lab3/lab3.component'
import { Lab4Component } from './lab4/lab4.component'

const routes: Routes = [
  { path: '', redirectTo: '/lab2', pathMatch: 'full' },
  { path: 'lab2', component: Lab2Component },
  { path: 'lab3', component: Lab3Component },
  { path: 'lab4', component: Lab4Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
