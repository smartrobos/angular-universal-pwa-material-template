import { Component, ElementRef, NgZone, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { scrollbarOptions } from './scrollbar-options';
import { isPlatformBrowser , isPlatformServer } from '@angular/common';

@Component({
  selector: 'gs-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrls: ['./scrollbar.component.scss']
})
export class ScrollbarComponent implements OnInit {

  scrollbarRef: Scrollbar;
  element: ElementRef;

  constructor(
    private _element: ElementRef,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      // Do Nothing as Server Side does not have any implementation.
    }
    if (isPlatformBrowser(this.platformId)) {
      this.element = this._element;
      const options = scrollbarOptions;
      this.zone.runOutsideAngular(() => {
        this.scrollbarRef = Scrollbar.init(this.element.nativeElement, options);
      });
    }
  }
}
