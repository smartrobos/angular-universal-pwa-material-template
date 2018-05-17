import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser , isPlatformServer } from '@angular/common';

@Injectable()
export class WindowService {

    
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {  }
    
    dispatchEventResize(){
        this._dispatchEvent('resize');
    }

    private _dispatchEvent(eventName: string){
        if (isPlatformServer(this.platformId)) {
            // Do Nothing as Server Side does not have any implementation.
         }
         if (isPlatformBrowser(this.platformId)) {
            window.dispatchEvent(new Event(eventName));
         }
    }
}