import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

let isDebugMode = environment.production;

const noop = (): any => undefined;

@Injectable()
export class LoggerService {
  constructor() {}

  /**
  **  we define a getter that uses the bind() method to create a bound function. 
    (so we log the correct source file name and line number) and passes along any arguments.
  * @returns For general output of logging information
  */
  get log() {
    if (isDebugMode) {
      return console.log.bind(console);
    } else {
      return noop;
    }
  }

  /**
  *  we define a getter that uses the bind() method to create a bound function. 
    (so we info the correct source file name and line number) and passes along any arguments.

  * @returns Informative logging of information
  */
  get info() {
    if (isDebugMode) {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  /**
 *  we define a getter that uses the bind() method to create a bound function. 
   (so we warn the correct source file name and line number) and passes along any arguments.

 * @returns Outputs a warning message.
 */
  get warn() {
    if (isDebugMode) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  /**
 *  we define a getter that uses the bind() method to create a bound function. 
   When the associated property is looked up, it executes the passed-in function in the given context 
   (so we error the correct source file name and line number) and passes along any arguments.

 * @returns Outputs an error message. 
 */
  get error() {
    if (isDebugMode) {
      return console.error.bind(console);
    } else {
      return noop;
    }
  }
}
