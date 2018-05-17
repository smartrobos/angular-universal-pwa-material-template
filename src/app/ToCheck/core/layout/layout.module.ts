import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';
import { ToolbarModule } from '@app/core/toolbar/toolbar.module';
import { SidenavModule } from '@app/core/sidenav/sidenav.module';
import { LayoutComponent } from '@app/core/layout/layout.component';
import { ScrollbarModule } from '@app/core/common/scrollbar/scrollbar.module';
import { FooterModule } from '@app/core/footer/footer.module';
import { Error404PageComponent } from '@app/core/404/error404-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ToolbarModule,
    SidenavModule,
    FooterModule,
    ScrollbarModule
  ],
  declarations: [LayoutComponent,Error404PageComponent],
})
export class LayoutModule { }


