import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Lab2Component } from './lab2/lab2.component';
import { LayoutModule } from '@angular/cdk/layout';
import { Lab3Component } from './lab3/lab3.component';
import { Lab4Component } from './lab4/lab4.component';
import { AddingNodesComponent } from './lab2/children/adding-nodes/adding-nodes.component';
import { RemovingNodesComponent } from './lab2/children/removing-nodes/removing-nodes.component';
import { MovingNodesComponent } from './lab2/children/moving-nodes/moving-nodes.component';
import { MergingListsComponent } from './lab2/children/merging-lists/merging-lists.component';
import { IntersectingListsComponent } from './lab2/children/intersecting-lists/intersecting-lists.component';
import { SortingListComponent } from './lab2/children/sorting-list/sorting-list.component';
import { Task2Component } from './lab2/children/task2/task2.component';
import { AddingItemsComponent } from './lab3/children/adding-items/adding-items.component';
import { RemovingItemsComponent } from './lab3/children/removing-items/removing-items.component';
import { SwappingItemsComponent } from './lab3/children/swapping-items/swapping-items.component';
import { CheckingItemsComponent } from './lab3/children/checking-items/checking-items.component';

@NgModule({
  declarations: [
    AppComponent,
    Lab2Component,
    Lab3Component,
    Lab4Component,
    AddingNodesComponent,
    RemovingNodesComponent,
    MovingNodesComponent,
    MergingListsComponent,
    IntersectingListsComponent,
    SortingListComponent,
    Task2Component,
    AddingItemsComponent,
    RemovingItemsComponent,
    SwappingItemsComponent,
    CheckingItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
