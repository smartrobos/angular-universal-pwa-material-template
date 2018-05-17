import { Injectable, Injector, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class AppLoadService {
  config: Object;
  constructor(
  ) {
    this.getSettings();
  }

  /* Execute only on the Client Side not on the Server */

  getSettings(): Promise<any>{
      return new Promise((resolve, reject) => {
        this.config = environment;
        resolve(true);
      });
  }
 
  public getConfig(key: any) {
    let retVal = null;
    if (this.config) retVal = this.config[key] ? this.config[key] : null;
  //  console.log('Value for key: ', key, retVal);
    return retVal;
  }

  noopDoNothing(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}
