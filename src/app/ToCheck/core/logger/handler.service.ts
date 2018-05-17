import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import { LoggerService, GlobalService } from '@app/core';

let isDebugMode = environment.production;
const noop = (): any => undefined;

@Injectable()
export class HandlerService {
  BACK_END_HOST: any;
  model: any = [];
  errorData = [];
  lastIndexSubmittedToDB = -1;

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private globalService: GlobalService
  ) {
    this.BACK_END_HOST = this.globalService.BACK_END_HOST;
    this.configToSendErrorToServer();
  }

  /**
   * Configures to Send Error Data to Server with 60 seconds Interval
   * @returns      None
   */
  configToSendErrorToServer() {
    setInterval(() => {
      let currentLastIndex = this.errorData.length - 1;
      let delta = currentLastIndex - this.lastIndexSubmittedToDB;
      if (delta) {
        this.insertLoggerData(currentLastIndex);
      }
    }, 60000);
  }

  /**
   * @param {string} message  represent any string describing the error
   * @param {Object} data  optional parameter - contains JSON OBject representing more details of the error.
   *
   * @example
   * error('Error message description',{errCode: 123, errStack: "Stackflow"})
   *
   * @returns      None
   */
  error(message: string, data?: object) {
    let temp = this.errorConsoleData(message, data);
    this.errorData.push(temp);
    if (isDebugMode) {
      console.error(this.displayConsoleData(temp));
    } else {
      return noop;
    }
  }

  /**
   * @param {any} temp  represent type is any describing the displaying the error
   *
   * @example
   * displayConsoleData(28/12/2016, 11:39:25 Cannot read property 'temp' of undefined)
   *
   * @returns  currentDate with time,error message and data
   */
  displayConsoleData(temp: any) {
    return (
      temp.date.toLocaleString() +
      ' ' +
      temp.message +
      '  ' +
      JSON.stringify(temp.data)
    );
  }

  /**
   * @param {string} message  represent any string describing the error
   * @param {Object} data  optional parameter - contains JSON Object representing more details of the error.
   *
   * @example
   * errorConsoleData({
   * 	"level" : "error",
   *  "message" : "Cannot read property 'message' of undefined",
   *  "data":"more details of the error",
   *  "date" : ISODate("2015-11-28T06:09:25.788Z")
   * }
   * )
   *
   * @returns  JSON Object it contains level is  error, message and data
   */
  errorConsoleData(message: string, data?: object) {
    return { level: 'error', message: message, data: data, date: new Date() };
  }

  /**
   * @param {number} currentLastIndex  represent array index type  number, describing the last  currentLastIndex
   *
   * @example
   * insertLoggerData(last index of array)
   *
   * @returns None
   */
  insertLoggerData(currentLastIndex: number) {
    this.model = this.errorData;
    this.sendingErrorToDB(this.model).subscribe(
      data => {
        this.lastIndexSubmittedToDB = currentLastIndex;
      },
      error => {
        throw new Error(error);
      }
    );
  }

  /**
     * @param {any} model  represent type is any describing the displaying the error
     * 
     * @example
     * sendingErrorToDB([
        {
       "level" : "error",
       "message" : "Cannot read property of undefined",
       "data" : "error data with stack trace"
       "date" : "2010-09-28T06:57:36.625Z"
    }
     ])
     *
     * @returns  loggerResponse
  */
  sendingErrorToDB(model): Observable<any> {
    let URL = this.BACK_END_HOST + 'insertlogger';
    return this.http
      .post(URL, model)
      .map((response: Response) => {
        let loggerResponse = response;
        if (loggerResponse) {
          return JSON.stringify(loggerResponse);
        } else {
          this.logger.warn('Response is empty');
        }
      })
      .catch(this.handleErrorObservable);
  }

  /**
   * @param {Response | any} error  describing the error response
   *
   * @example
   * handleErrorObservable(Cannot read property of 'model' undefined)
   *
   * @returns  throw error message
   */
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
