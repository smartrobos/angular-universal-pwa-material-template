import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const headers = new HttpHeaders({
  'Authorization': 'token 123',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Origin': '*'
});
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let logger = this.injector.get(LoggerService);

    /*
    let validUrlChecker = /^(https?):\/\/+(www\.)?[a-z0-9\-\.]/;
    if (!validUrlChecker.test(req.url)) {
      throw new Error('Incoming URL Request is not correct: ' + req.url);
    }
    */

    // Clone the request to add the new header.
    const authReq = req.clone({ headers });

    //send the newly created request
    return next.handle(authReq).catch((error, caught) => {
      //return the error to the method that called it
      return Observable.throw(error);
    }) as any;
  }
}
