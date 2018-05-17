import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {environment} from '../environments/environment';


@Injectable()
export class AppConfig {

    private config: Object = null;
    private env:    Object = null;

    constructor(private http: HttpClient) {
        this.load();
    }

    public getConfig(key: any) {
        let retVal = null;
        if(this.config)
            retVal =  this.config[key] ? this.config[key]:null;
        console.log("Returning value for key: ",key,retVal);
        return retVal;
    }

    public load() {
        let request = this.http.get("http://localhost:4200/assets/config.development.json");
        if (environment.production) {
            request = this.http.get("http://localhost:4200/assets/config.production.json");
        }
        request.map((response: Response) => {
            let data = response || {};
            console.log("Response: ",response);
            return data;
            }).catch(this.handleErrorObservable).subscribe(
                (responseData) => {
                    this.config = responseData;
                    console.log("Current Config: ",this.config);
                }
        );
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
      }
}