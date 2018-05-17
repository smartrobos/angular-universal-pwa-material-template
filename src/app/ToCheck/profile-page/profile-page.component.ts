import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '@app/core/auth/auth.service'
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfileComponent  {
  userInfo;
  constructor(
    private router: Router,
        public authService: AuthService,
  ) {
    this.authService.getUserInfo.subscribe(userInfo => {
      this.userInfo = userInfo;
  });
  }
  getUserImageUrl(): string {
    return this.userInfo.userDetails.image;
  }

}
