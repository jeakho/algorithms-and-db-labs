import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Lab6Component } from './lab6.component'
import { AppMaterialModule } from '../app-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsDialogComponent } from './settings-dialog.component';


@NgModule({
  declarations: [
    Lab6Component,
    SettingsDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Lab6Module { }
