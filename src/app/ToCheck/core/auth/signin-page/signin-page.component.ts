import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { pattern, hintMessages, validationMessages } from "@app/core/auth/register-page/register-page.const";

@Component({
  selector: 'scl-signin',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SignInComponent implements OnInit {
  pattern: { email: string; password: string; };

  loginForm: NgForm;
  model: any = {};
  private data: any;
  error:boolean; 
  message:string;
  @ViewChild('loginForm') currentLoginForm: NgForm;

  constructor(private authService: AuthService, private router: Router) {
    this.pattern = pattern;
  }
  ngOnInit() {
   
  }

  formValidity = {
    email: false,
    password: false,
   
  };

  formErrors = {
    email: '',
    password: '',
   
  };

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentLoginForm === this.loginForm) {
      return;
    }
    this.loginForm = this.currentLoginForm;
    if (this.loginForm) {
        this.loginForm.valueChanges.subscribe(data =>
        this.onValueChanged(data)
      );
    }
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm.form;
    
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

  googlelogin() {
    window.open(
        this.authService.BACK_END_HOST +
        'auth/google/login?return=' + this.authService.HOST,
        '_self'
    );
  }

  facebooklogin() {
    this.authService.loginDetails.isLoggedIn = true;
    window.location.href =
    this.authService.BACK_END_HOST + 'auth/facebook/login';
  }
  resetForm(): void {
    if (this.loginForm) {
      this.loginForm.resetForm();
    }
  }

  directlogin() {
    this.model = {
      username: this.model.email,
      password: this.model.password
    };
    this.authService.directLogin(this.model).subscribe(
      data => {
        this.data = data;
        this.resetForm();
        if (!this.data.type) {
          this.router.navigate(['/']);
        } else {
          this.error=true;
          this.message = this.data.message;
          this.router.navigate(['/auth/login']);
        }
      },
      error => {}
    );
  }

  
}
