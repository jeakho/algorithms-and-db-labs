import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lab4Component } from './lab4.component'
import { AddingItemsComponent } from './children/adding-items/adding-items.component'
import { SwappingItemsComponent } from './children/swapping-items/swapping-items.component'
import { CheckingItemsComponent } from './children/checking-items/checking-items.component'
import { AppMaterialModule } from '@/app/app-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtherOperationsComponent } from './children/other-operations/other-operations.component';



@NgModule({
  declarations: [
    Lab4Component,
    AddingItemsComponent,
    SwappingItemsComponent,
    CheckingItemsComponent,
    OtherOperationsComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class Lab4Module { }
