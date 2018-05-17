import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { SidenavService } from '@app/core/sidenav/sidenav.service';
import { SidenavState } from '@app/core/sidenav/sidenav-state.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LayoutComponent implements OnInit, AfterViewInit {

  isMobile : boolean;
  sidenavMode: string;
  sidenavOpen: boolean = false;
  currentSidenavState : SidenavState;

  @ViewChild('sidenav') sidenav;
 
  constructor(
    private sidenavService : SidenavService,
  ){
    this.sidenavService.sidenavState$.subscribe( sidenavState => {
        this.currentSidenavState = sidenavState;
        if( sidenavState === SidenavState.Mobile){
            this.isMobile = true;
            this.sidenavOpen = false;
            this.sidenavMode = 'over';
        } else if (sidenavState === SidenavState.Expanded ){
            this.isMobile = false;
            this.sidenavOpen = true;
            this.sidenavMode = 'side';
        }
      //Debug: console.log("this.isMobile this.sidenavOpen this.sidenavMode",this.isMobile,this.sidenavOpen,this.sidenavMode);
      }
    );
  }

  ngOnInit() {
  }

  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

  ngAfterViewInit(): void{
    this.sidenavService.sidenav = this.sidenav;
  }

  close(reason: string){
    this.sidenavService.closeSidenav();
  }

  sidenavState(state: string){
   let tempState : SidenavState;
    switch(state){
      case 'opened':
        tempState = this.isMobile ? SidenavState.MobileOpen : SidenavState.Expanded;
        break;
      case 'closed':
        tempState = this.isMobile ? SidenavState.Mobile : SidenavState.ExpandedClosed;
        break;
    }
    if(this.currentSidenavState != tempState)
      this.sidenavService.setSidenavState(tempState);
  }

  ngOnDestroy(): void {

  }
}
