import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lab11Component } from './lab11.component';
import { PriorityQueueManagerComponent } from './children/priority-queue-manager/priority-queue-manager.component';
import { HeapSortManagerComponent } from './children/heap-sort-manager/heap-sort-manager.component';
import { AppMaterialModule } from '../app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeDrawerComponent } from '../tree-drawer/tree-drawer.component';



@NgModule({
  declarations: [
    Lab11Component, 
    PriorityQueueManagerComponent, 
    HeapSortManagerComponent,
    TreeDrawerComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Lab11Module { }
