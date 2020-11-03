import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; 
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog'; 

@NgModule({
  declarations: [],
  imports: [
    MatTabsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  exports: [
    MatTabsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDialogModule
  ]
})
export class AppMaterialModule { }
