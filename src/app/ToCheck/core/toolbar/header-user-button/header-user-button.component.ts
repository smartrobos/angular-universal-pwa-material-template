import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { LoginDetails } from '../../../models/login/user-details.interface';
import { MatMenuTrigger } from '@angular/material';
import { AuthService } from '@app/core/auth//auth.service';

@Component({
  selector: 'gs-header-user-button',
  templateUrl: './header-user-button.component.html',
  styleUrls: ['./header-user-button.component.scss']
})
export class HeaderUserButtonComponent implements OnInit {
  private router: Router;
  isLoggedIn: boolean = false;
  isMenuOpen: boolean = false;
  userInfo = new LoginDetails();
  isaddtoCart: boolean = false;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  isLoggedinSubscription:Subscription;
  userInfoSubscription:Subscription;
  isaddtoCartSubscription:Subscription;

  constructor(
    private authService:AuthService
  ) {

    }

  ngOnInit() {
   this.isLoggedinSubscription = this.authService.isLoggedIn.subscribe(status => this.isLoggedIn = status);
   this.userInfoSubscription=this.authService.getUserInfo.subscribe(userInfo => this.userInfo = userInfo);
  }

  ngAfterViewInit() {
    if (this.trigger) {
      this.menuStatusSubscribe();
    }
  }

  menuStatusSubscribe() {

    this.isMenuOpen = this.trigger.menuOpen;
    this.trigger.menuOpened.subscribe(
      event => (this.isMenuOpen = this.trigger.menuOpen),
      err => { }
    );
    this.trigger.menuClosed.subscribe(
      event => (this.isMenuOpen = this.trigger.menuOpen),
      err => { }
    );
  }

  getUserEmail(): string {
    return this.userInfo.userDetails.email;
  }

  getUserDisplayName(): string {
    //this.userInfo.userDetails.name.display ||
    return  "Display Name Not Available";
  }

  getUserImageUrl(): string {
    return this.userInfo.userDetails.image;
  }

  logout() {
    console.log("logout");
    this.authService.logout().subscribe();
  }
  

}
