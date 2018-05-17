import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule, MatIconModule, MatToolbarModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSortModule,
  MatTableModule, MatPaginatorModule, MatDialogModule, MatProgressSpinnerModule,
  MatListModule, MatSlideToggleModule, MatMenuModule, MatProgressBarModule, MatTabsModule,
  MatCheckboxModule,MatSidenavModule,MatSnackBarModule,MatExpansionModule,MatAutocompleteModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [],

  exports: [
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatAutocompleteModule

  ]

})
export class MaterialModule { }