import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SigninRoutingModule } from './signin-routing.module';
import { SignInComponent } from '@app/core/auth/signin-page/signin-page.component';
import { MaterialCustomModule } from '@app/core/auth/material-custom-module';
//import { MaterialModule } from '@app/shared/material.module';


@NgModule({

    imports: [
        CommonModule,
  //      MaterialModule,
        SigninRoutingModule,
        FormsModule,
        MaterialCustomModule
    ],

    declarations: [
        SignInComponent
    ]
})
export class SigninModule {
    constructor() { }
}
