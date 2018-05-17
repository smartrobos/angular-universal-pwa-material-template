import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '@app/core/auth/auth.service';
import { pattern, hintMessages, validationMessages } from "../register-page/register-page.const";


@Component({
  selector: 'scl-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent{
  pattern: { email: string; password: string; };
  forgotPasswordForm: NgForm;
  model: any = {};
  message:string;
  error : string; 
  sendLink:boolean;
  @ViewChild('forgotPasswordForm') currentForgotPwdForm: NgForm;

  formValidity = {
    email: false  
  };

  formErrors = {
    email: ''   
  };

  constructor(
    private authService: AuthService, 
    private router: Router) {
      this.pattern = pattern;
  }

  ngOnInit(){
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForgotPwdForm === this.forgotPasswordForm) {
      return;
    }
    this.forgotPasswordForm = this.currentForgotPwdForm;
    if (this.forgotPasswordForm) {
        this.forgotPasswordForm.valueChanges.subscribe(data =>
        this.onValueChanged(data)
      );
    }
  }

  onValueChanged(data?: any) {
    if (!this.forgotPasswordForm) {
      return;
    }
    const form = this.forgotPasswordForm.form;
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
     
    }
  }


  forgotPassword() { 
      this.authService.forgotpassword(this.model.email).subscribe(
        data => {
          this.message = 'Check your email for the reset link';
          this.sendLink=true;
        },
        error => {}
      );    
  }
}
