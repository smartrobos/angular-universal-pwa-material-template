import { Component, OnInit, Inject, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '@app/core/auth/auth.service';
import { pattern, hintMessages, validationMessages } from "./register-page.const";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TermsandConditionsComponent } from '@app/core/auth/register-page/terms-and-conditions/terms-and-conditions';
import {Register, LoginDetails} from '@app/models/login/user-details.interface';

@Component({
  selector: 'scl-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterComponent implements AfterViewChecked {
  checked: boolean = false;
  success: boolean;
  errorMessage: string;
  successMessage: string;
  pattern: { email: string; password: string; };
  registerForm: NgForm;
   model:any={};
   error: boolean;
  passwordConfPassMatch: boolean = false;
  @ViewChild('registerForm') currentRegisterForm: NgForm;

  formValidity = {
    email: false,
    password: false,
    cPassword: false,
    first: false,
    telephone: false
  };

  formErrors = {
    email: '',
    password: '',
    cPassword: '',
    first: '',
    telephone: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog) {
    this.pattern = pattern;
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentRegisterForm === this.registerForm) {
      return;
    }
    this.registerForm = this.currentRegisterForm;
    if (this.registerForm) {
      this.registerForm.valueChanges.subscribe(data =>
        this.onValueChanged(data)
      );
    }
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }
    const form = this.registerForm.form;
    this.passwordConfPassMatch = false;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control == null || control == undefined) {
        continue;
      }
      this.formValidity[field] = control.valid;

      if (control && control.dirty && !control.valid) {
        const messages = validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
      if (field == 'cPassword' && control && control.dirty && control.valid) {
        if (this.model.password == this.model.cPassword) {
          this.passwordConfPassMatch = true;
        } else {
          this.formErrors[field] += 'Pasword and conf password Mis Match' + ' ';
        }
      }
    }
  }

  register() {
    this.authService.register(this.model).subscribe(
      (data: any) => {
        if (data.type != 'UserExistsError') {
          this.success = true;
          this.error = false;
          this.successMessage = 'Registration Successful.Please Check your email.';
        } else {
          this.error = true;
          this.success = false;
          this.errorMessage = 'Username is already registered';
          this.router.navigate(['/auth/register']);
        }
      },
      error => { }
    );
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(TermsandConditionsComponent, {
      width: '800px',
      height: '500px'

    });

    dialogRef.afterClosed().subscribe(result => {
      this.checked = result;
    });
  }
}
