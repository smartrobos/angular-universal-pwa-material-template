import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'scl-terms-and-conditions',
  templateUrl: './terms-and-conditions.html',
  styleUrls: ['./terms-and-conditions.scss']
})
export class TermsandConditionsComponent   {
    
      constructor(
        public dialogRef: MatDialogRef<TermsandConditionsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    
      onNoClick(): void {
        this.dialogRef.close();
      }
      agree() {
        this.dialogRef.close(true);
      } 
}