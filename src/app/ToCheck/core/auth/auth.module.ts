import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { MaterialModule } from '@app/shared/material.module';
import { MaterialCustomModule } from '@app/core/auth/material-custom-module';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
 //   MaterialModule,
    MaterialCustomModule,
    FormsModule,
    ReactiveFormsModule,   
  ]

})
export class AuthModule {
  constructor() {}
}
