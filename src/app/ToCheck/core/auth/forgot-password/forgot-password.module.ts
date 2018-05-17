import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from '@app/core/auth/forgot-password/forgot-password.component';
import { MaterialCustomModule } from '@app/core/auth/material-custom-module';

@NgModule({
    imports: [
        CommonModule,
        ForgotPasswordRoutingModule,
        FormsModule,
        MaterialCustomModule

    ],
    declarations: [
        ForgotPasswordComponent
    ]
})
export class ForgotPasswordModule {
    constructor() { }
}
