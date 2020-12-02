import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../app/app-material.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

import { Lab2Module } from './lab2/lab2.module';
import { Lab3Module } from './lab3/lab3.module';
import { Lab4Module } from './lab4/lab4.module';
import { Lab5Module } from './lab5/lab5.module';
import { Lab6Module } from './lab6/lab6.module';
import { Lab8Module } from './lab8/lab8.module';
import { TouchedErrorStateMatcherService } from './error-state-matchers/touched-error-state-matcher.service';
import { TreeControllerComponent } from './tree-controller/tree-controller.component';
import { Lab10Component } from './lab10/lab10.component';
import { Lab8Component } from './lab8/lab8.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeControllerComponent,
    Lab10Component,
    Lab8Component
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    Lab2Module,
    Lab3Module,
    Lab4Module,
    Lab5Module,
    Lab6Module,
    Lab8Module
  ],
  providers: [
    { provide: 'TouchedErrorStateMatcher', useClass: TouchedErrorStateMatcherService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
