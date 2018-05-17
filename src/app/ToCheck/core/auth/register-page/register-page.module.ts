import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialCustomModule } from '@app/core/auth/material-custom-module';
import { RegisterRoutingModule } from './register-page-routing.module';
import { RegisterComponent, } from '@app/core/auth/register-page/register-page.component';
import { TermsandConditionsComponent } from '@app/core/auth/register-page/terms-and-conditions/terms-and-conditions';

@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
        MaterialCustomModule,
        FormsModule
    ],
    declarations: [
        RegisterComponent,
        TermsandConditionsComponent
    ],
    entryComponents: [
        TermsandConditionsComponent
    ]
})
export class RegisterModule {
    constructor() { }
}
