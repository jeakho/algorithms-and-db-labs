import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lab8Component } from './lab8.component';
import { AppMaterialModule } from '../app-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Lab8Component
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Lab8Module { }
