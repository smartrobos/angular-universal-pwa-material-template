import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from '@app/core/auth/reset-password/reset-password.component';
import { MaterialCustomModule } from '@app/core/auth/material-custom-module';

@NgModule({
    
    imports: [
        CommonModule,
        ResetPasswordRoutingModule,
        MaterialCustomModule,
        FormsModule
    ],

    declarations: [
        ResetPasswordComponent
    ]
})
export class ResetPasswordModule {
    constructor() { }
}
