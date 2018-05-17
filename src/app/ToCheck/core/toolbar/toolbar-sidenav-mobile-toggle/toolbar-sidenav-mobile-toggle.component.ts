import { Component, Input } from '@angular/core';
import { SidenavService } from '@app/core/sidenav/sidenav.service';

@Component({
  selector: 'gs-toolbar-sidenav-mobile-toggle',
  templateUrl: './toolbar-sidenav-mobile-toggle.component.html',
  styleUrls: ['./toolbar-sidenav-mobile-toggle.component.scss']
})
export class ToolbarSidenavMobileToggleComponent {

  constructor(private sidenavService: SidenavService) {
  }

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }
}
