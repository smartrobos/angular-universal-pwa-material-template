import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser , isPlatformServer } from '@angular/common';

@Injectable()
export class LocalStorageService {

    
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {  }
    
    getItem(key:any){
        if (isPlatformServer(this.platformId)) {
           // Do Nothing as Server Side does not have any implementation.
        }

        if (isPlatformBrowser(this.platformId)) {
           
           return localStorage.getItem(key);
        }

    }

    setItem(key:any,value:any){
        if (isPlatformServer(this.platformId)) {
            // Do Nothing as Server Side does not have any implementation.
        }

        if (isPlatformBrowser(this.platformId)) {
           return localStorage.setItem(key, value)
        }
    }
    
    removeItem(key:any){
        if (isPlatformServer(this.platformId)) {
           // Do Nothing as Server Side does not have any implementation.
        }

        if (isPlatformBrowser(this.platformId)) {
           return localStorage.removeItem(key);
        }
    }
}