import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule, MatCheckboxModule,MatIconModule, MatInputModule, MatButtonModule,MatDialogModule, MatFormFieldModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [],

  exports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    FlexLayoutModule,
  ]

})
export class MaterialCustomModule { }