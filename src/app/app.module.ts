import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '@/app/app-material.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { Lab2Module } from './lab2/lab2.module'
import { Lab3Module } from './lab3/lab3.module'
import { Lab4Module } from './lab4/lab4.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    Lab2Module,
    Lab3Module,
    Lab4Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
