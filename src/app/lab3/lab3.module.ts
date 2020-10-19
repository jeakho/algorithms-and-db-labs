import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { Lab3Component } from './lab3.component'
import { AddingItemsComponent } from './children/adding-items/adding-items.component';
import { RemovingItemsComponent } from './children/removing-items/removing-items.component';
import { SwappingItemsComponent } from './children/swapping-items/swapping-items.component';
import { CheckingItemsComponent } from './children/checking-items/checking-items.component';



@NgModule({
  declarations: [
    Lab3Component,
    AddingItemsComponent,
    RemovingItemsComponent,
    SwappingItemsComponent,
    CheckingItemsComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Lab3Module { }
