import { ModuleWithProviders, NgModule, Optional, SkipSelf , ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlSerializer } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from '@app/core/auth/auth.service';
import { UserService } from '@app/core/user/user.service';
import { HandlerService } from '@app/core/logger//handler.service';
import { SidenavService } from '@app/core/sidenav/sidenav.service';
import { MatIconRegistry } from '@angular/material';


import { Interceptor, WindowService } from '@app/core';
import { LowerCaseUrlSerializer } from '@app/core';
import { GlobalErrorHandler } from '@app/core';
import { LoggerService } from '@app/core';
import { GlobalService } from '@app/core';
import { LocalStorageService } from '@app/core';
import { HttpErrorHandler } from '@app/core';
import { LayoutModule } from '@app/core/layout/layout.module';
import { Error404PageComponent } from '@app/core/404/error404-page.component';

const sharedProviders = [
  LoggerService,
  AuthService,
  GlobalService,
  UserService,
  LocalStorageService,
  HandlerService,
  WindowService,
  HttpErrorHandler,
  SidenavService,
  MatIconRegistry,
  //All above cause 200kb increase
 // { provide: ErrorHandler, useClass: GlobalErrorHandler}, //Consumes 250KB
  { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }
];

@NgModule({
  imports:      [
    CommonModule,
    HttpClientModule,
    LayoutModule,
  ],
})

export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: sharedProviders
    };
  }
}

