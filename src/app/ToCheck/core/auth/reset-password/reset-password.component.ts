import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '@app/core/auth/auth.service';
import { pattern, hintMessages, validationMessages } from "../register-page/register-page.const";


@Component({
  selector: 'scl-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements AfterViewChecked {
  error: boolean;
  success: boolean;
  pattern: { email: string; password: string; };
  resetForm: NgForm;
  model: any = {};
  message: string;
  userInfo;
  passwordConfPassMatch: boolean = false;
  @ViewChild('resetForm') currentResetForm: NgForm;

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
    private router: Router) {
    this.pattern = pattern;
  }

  ngOnInit() {
    this.authService.getUserInfo.subscribe(userInfo => this.userInfo = userInfo);
    if (this.userInfo.isLoggedIn) {
      this.model.email = this.userInfo.userDetails.email;
    }
    else {
      this.router.navigate(['/'])
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentResetForm === this.resetForm) {
      return;
    }
    this.resetForm = this.currentResetForm;
    if (this.resetForm) {
      this.resetForm.valueChanges.subscribe(data =>
        this.onValueChanged(data)
      );
    }
  }

  onValueChanged(data?: any) {
    if (!this.resetForm) {
      return;
    }
    const form = this.resetForm.form;
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

  resetPassword() {
    this.authService.changepassword(this.model)
      .subscribe(
        (data: any) => {
          if (data.status == "Pass") {
            this.message = "Reset Password Successfully";
            this.success = true;
            this.error = false;
          }
          else {
            this.message = "Incorect Password";
            this.success = false;
            this.error = true;
          }
        },
        error => {
        });
  }
  signOut() {

    this.authService.logout().subscribe(
      data => {
        this.router.navigate(['/auth/login']);
      }
    );

  }
}
