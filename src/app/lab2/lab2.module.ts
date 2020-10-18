import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '@/app/app-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Lab2Component } from './lab2.component';
import { AddingNodesComponent } from './children/adding-nodes/adding-nodes.component';
import { RemovingNodesComponent } from './children/removing-nodes/removing-nodes.component';
import { MovingNodesComponent } from './children/moving-nodes/moving-nodes.component';
import { MergingListsComponent } from './children/merging-lists/merging-lists.component';
import { IntersectingListsComponent } from './children/intersecting-lists/intersecting-lists.component';
import { SortingListComponent } from './children/sorting-list/sorting-list.component';
import { Task2Component } from './children/task2/task2.component';


@NgModule({
  declarations: [
    Lab2Component,
    AddingNodesComponent,
    RemovingNodesComponent,
    MovingNodesComponent,
    MergingListsComponent,
    IntersectingListsComponent,
    SortingListComponent,
    Task2Component
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Lab2Module { }
