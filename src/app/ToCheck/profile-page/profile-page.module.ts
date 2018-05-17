import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/shared/material.module';
import { ProfileRoutingModule } from './profile-page-routing.module';
import { ProfileComponent } from '@app/profile-page/profile-page.component';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,

    ],
    declarations: [
        ProfileComponent
    ]
})
export class ProfileModule {
    constructor() { }
}
