import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Lab5Component } from './lab5.component'
import { AppMaterialModule } from '../app-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Lab5Component
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Lab5Module { }
