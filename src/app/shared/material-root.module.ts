import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, 
  MatListModule, 
  MatIconModule, 
  MatToolbarModule, 
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatMenuModule, 
  MatSnackBarModule,
  MatIconRegistry,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    MatButtonModule, 
    MatListModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatMenuModule, 
    MatSnackBarModule,
    FlexLayoutModule
  ]

})
export class MaterialRootModule { }