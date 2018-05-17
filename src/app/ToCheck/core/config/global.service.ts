import { Injectable } from '@angular/core';
import { AppLoadService } from '@app/core/initConfig//appload.service';

@Injectable()
export class GlobalService {

  BACK_END_HOST: string;
  HOST : string;
  directLoggedIn:           boolean=true;
  showSideMenuToggleButton: boolean = true;
  showSidenav:              boolean = true;
  homeButton:               boolean = true;
  dashBoardPage:            boolean = true;
  homeLogo:                 boolean = false;
  loginButton:              boolean = false;

  public confirmid:string;
  public homeMenuButton: boolean = false;
  public flexPercent: string = "85%";
  public sideNavShow: boolean = false;
  public prevUrlFullPath: string = null;
  public currentUrlFullPath: string = null;
  public prevRootCourse: string = null;
 
  public currentRootCourse: string = null;

  
  constructor(
   private config: AppLoadService
  ) {
    this.HOST = config.getConfig("HOST");
    this.BACK_END_HOST = config.getConfig('BACK_END_HOST');
    this.setIniitalConfig();
  }

  getDefaultImage(){
    if(this.HOST){
      return this.HOST+"/assets/avatar1.png";
    } 
  }
  
  setIniitalConfig() {
    this.showSideMenuToggleButton = true;
    this.showSidenav = true;
    this.homeButton = true;
    this.dashBoardPage = false;
    this.homeLogo = false;
    this.loginButton = false;
    this.homeMenuButton = false;
    this.sideNavShow = false;
  }

  setRootPageConfig() {
    this.showSideMenuToggleButton = false;
    this.showSidenav = false;
    this.homeButton = false;
    this.dashBoardPage = true;
    this.sideNavShow = false;
  }

  setMenuConfig(menuType: string) {
    //Debug console.log("Setting Menu Config for : "+menuType);

    let unKnownMenuType: Boolean = false;
   // this.sidenavService.removeAllItems();

    if (!unKnownMenuType) {
  //    this.sidenavService.currentContent = menuType.toUpperCase();
  //    this.sidenavService.updateMenu();
    }
  }
}

