import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as StackTrace from 'stacktrace-js';

//import { HandlerService } from '@app/core';
import { LoggerService } from '@app/core';

let isDebugMode = environment.production;
const noop = (): any => undefined;

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  model: any = [];
  errorData = [];
  lastIndexSubmittedToDB = -1;

  constructor(
 //   private logger: LoggerService,
 //   private authService:AuthService,
    private injector: Injector,
  //  private http: HttpClient,
  ) {
    //Need to Send Data to DB this should be in another Service ; Need to take care of this
   // this.configToSendErrorToServer();
  }
  /**
   * @param {any} error  describing the error
   * @example
   * handleError(handle the error with current route get the stack trace)
   * @returns None
   */
  async handleError(error) {
    let errObj = { currentRoute: '', stack: '' };
    let message = error.message ? error.message : error.toString();
    try {
      const location = this.injector.get(LocationStrategy);
      const route =
        location instanceof PathLocationStrategy ? location.path() : '';
      const stackFrames = await StackTrace.fromError(error);
      let stackString = stackFrames
        ? stackFrames.splice(0, 1).map(sf => sf.toString())
        : 'StackTrace Not Available';
      errObj.currentRoute = route;
      errObj.stack = stackString;
    } catch (err) {
      message += 'Additional Error: Processing the ErrorMessage: ' + err;
    } finally {
      //console.error(errObj);
      this.error(message, errObj);
    }
  }

  /**
   * @param {string} message  represent any string describing the error
   * @param {Object} data  optional parameter - contains JSON OBject representing more details of the error.
   * @example
   * error('Error message description',{errCode: 123, errStack: "Stackflow"})
   * @returns      None
   */
  error(message: string, data?: object) {
    let temp = this.errorConsoleData(message, data);
    this.errorData.push(temp);
    if (isDebugMode) {
      console.error(temp);
    } else {
      return noop;
    }
  }

  /**
   * @param {string} message  represent any string describing the error
   * @param {Object} data  optional parameter - contains JSON Object representing more details of the error.
   * @example
   * errorConsoleData({
   * 	"level" : "error",
   *  "message" : "Cannot read property 'message' of undefined",
   *  "data":"more details of the error",
   *  "date" : ISODate("2015-11-28T06:09:25.788Z")
   * }
   * )
   * @returns  JSON Object it contains level is  error, message and data
   */
  errorConsoleData(message: string, data?: object) {
    return {
      level: 'error',
      message: message,
      data: data,
      date: new Date().toLocaleString()
    };
  }
  ngOnDestroy() {
    console.log('Global Error Handler Service called');
  }
}
