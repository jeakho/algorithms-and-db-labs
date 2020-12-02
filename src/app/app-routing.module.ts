import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Lab2Component } from './lab2/lab2.component';
import { Lab3Component } from './lab3/lab3.component';
import { Lab4Component } from './lab4/lab4.component';
import { Lab5Component } from './lab5/lab5.component';
import { Lab6Component } from './lab6/lab6.component';
import { Lab8Component } from './lab8/lab8.component';
import { Lab10Component } from './lab10/lab10.component';

const routes: Routes = [
  { path: '', redirectTo: '/lab2', pathMatch: 'full' },
  { path: 'lab2', component: Lab2Component },
  { path: 'lab3', component: Lab3Component },
  { path: 'lab4', component: Lab4Component },
  { path: 'lab5', component: Lab5Component },
  { path: 'lab6', component: Lab6Component },
  { path: 'lab8', component: Lab8Component },
  { path: 'lab10', component: Lab10Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
