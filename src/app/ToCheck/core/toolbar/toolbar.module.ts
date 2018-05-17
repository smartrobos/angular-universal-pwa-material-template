import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';

import { ToolbarSidenavMobileToggleComponent } from "./toolbar-sidenav-mobile-toggle/toolbar-sidenav-mobile-toggle.component"
import { ToolbarComponent } from '@app/core/toolbar/toolbar.component';
import { HeaderUserButtonComponent } from './header-user-button/header-user-button.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [ToolbarComponent,ToolbarSidenavMobileToggleComponent,HeaderUserButtonComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
