import { Component } from '@angular/core';
//import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
//import { Router, NavigationEnd, ActivatedRoute, Params } from "@angular/router";
import { Router } from "@angular/router";
import { MediaMatcher } from '@angular/cdk/layout';

import { AuthService } from '@app/core/auth//auth.service';
import { LoggerService } from '@app/core';
import { SidenavItem } from '@app/core/sidenav/sidenav-item/sidenav-item.interface';
import { SidenavService } from '@app/core/sidenav/sidenav.service';
import { menuItems } from '@app/core/sidenav/sidenav-menu';

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    loggerService : LoggerService,
    authService:AuthService,
    sidenavService: SidenavService
  ) {
    menuItems.forEach(item => sidenavService.addItem(item));
  }
}
