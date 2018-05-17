import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError } from 'rxjs/operators/catchError';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { LoggerService, LocalStorageService, GlobalService } from '@app/core';
import { HttpErrorHandler, HandleError } from '@app/core/http/http-error-handler.service';

import {
  LoginDetails,
  sidenavDetails,LoginData,
  ForgotPassword,
  EditUser,
  Register,
  ChangePassword,
} from '@app/models';

@Injectable()
export class AuthService {
  private handleError: HandleError;

  public BACK_END_HOST : string;
  public HOST : string;

  public sidenavDetails: sidenavDetails;
  loginDetails = new LoginDetails();

  private isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn = this.isLoginSubject.asObservable();

  private loginDetailsSubject = new BehaviorSubject<LoginDetails>(
    this.getLoginDetails()
  );
  getUserInfo = this.loginDetailsSubject.asObservable();

  constructor(
    private http: HttpClient,
    public loggerService: LoggerService,
    private localStorage: LocalStorageService,
    private globalService: GlobalService,
    private router: Router,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.BACK_END_HOST = this.globalService.BACK_END_HOST;
    this.HOST = this.globalService.HOST;
    this.handleError = httpErrorHandler.createHandleError('AuthService');
  }

  getLoginDetails() {
    let storedUserDetails = this.localStorage.getItem('currentUser');
    if (storedUserDetails) {
      this.loginDetails = JSON.parse(storedUserDetails);
    }
    return this.loginDetails;
  }

  private processLoginData(data: any, loginType: string) {
    this.loginDetails = {
      isLoggedIn: true,
      loginMethod: loginType,
      userDetails: data.user
    };
    this.localStorage.setItem('currentUser', JSON.stringify(this.loginDetails));
    this.isLoginSubject.next(true);
    this.loginDetailsSubject.next(this.loginDetails);
  }

  
  /**
   * Doss How are we using return value and Error Code
   * @param {string} sessionId using sessionId we can get the getSessionUserDetails
   *
   * @example
   * getDetails("sessionId")
   *
   * @returns user loginResponse
   */

  getDetails(sessionId: string): Observable<string> {
    let param = new HttpParams().set('sessionId', sessionId);
    let model = { sessionId: sessionId };
    let url = this.BACK_END_HOST + 'auth/getSessionUserDetails';
    return this.http
      .post(url, model)
      .map((response: any) => {
        console.log(response, 'response');
        let incomingData = response;
        if (incomingData.status != 'Fail') {
          this.processLoginData(incomingData, 'Social');
          return incomingData;
        } else {
          //Debug : this.loggerService.log("loginResponse", loginResponse.error);
          return incomingData.error;
        }
      })
      .catch(this.handleErrorObservable);
  }

  /**
   * Doss Why we are not making use of DirectLogin Stuff
   * @param {any} model  we can directlogin get the getSessionUserDetails
   *
   * @example
   * directlogin(model)
   *
   * @returns loginResponse
   */
  directLogin1 (user: LoginData): Observable<LoginData> {
    let url = this.BACK_END_HOST + 'auth/login';
    return this.http.post<LoginData>(url, user).
          pipe(
              catchError(this.handleError('directLogin',user))
          );
  }

  directLogin(model: LoginData): Observable<string> {
    let url = this.BACK_END_HOST + 'auth/login';
    return this.http
      .post<LoginData>(url, model)
      .map((response: any) => {
        let loginResponse = response;
        console.log(loginResponse,"login")
        if (loginResponse.status != 'Fail') {
          this.processLoginData(loginResponse, 'Custom');
          return loginResponse;
        } else {
          // Debug : this.loggerService.log("loginResponse", loginResponse.error);
          return loginResponse.error;
        }
      })
      .catch(this.handleErrorObservable);
  }

  /**
   * Doss - Check Observable returntype Should we not check any value of Return?
   * logout out the current user
   * Redirect from 'http://localhost:3000/auth/logout' to 'http://localhost:3000/' has been blocked by CORS policy: Request requires preflight, which is disallowed to follow cross-origin redirect.
   * @returns loginResponse
   */
  logout(): Observable<void> {
    let url = this.BACK_END_HOST + 'auth/logout';
    return this.http
      .get(url)
      .map(response => {
        this.loggerService.log(response);
        this.loginDetails.isLoggedIn = false;
        this.localStorage.removeItem('currentUser');
        this.isLoginSubject.next(false);
        this.loginDetailsSubject.next(this.loginDetails);
        this.router.navigate(['/']); //Return to Home After Logout
      })
      .catch(this.handleErrorObservable);
  }
  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken(): boolean {
    //this.isLoginSubject.next(false);
    //return false;

    return (
      this.loginDetails.isLoggedIn || !!this.localStorage.getItem('currentUser')
    );
    //return !!localStorage.getItem('currentUser');
  }

  /**
   * @param {any} model sending an email then we can change the password
   *
   * @example
   * forgotpassword()
   *
   * @returns loginResponse
   */
  forgotpassword(username: ForgotPassword): Observable<string> {
    let model ={
        username:username
    }
    let url = this.BACK_END_HOST + 'auth/forgotpassword';
    return this.http
      .post<ForgotPassword>(url, model)
      .map((response: any) => {
        let data = response;
        if (data.status != 'Fail') {
          return data;
        } else {
          return data.error;
        }
      })
      .catch(this.handleErrorObservable);
  }
  /**
   * @param {any} model  social user can  change this password using this function
   *
   * @example
   * resetpassword()
   *
   * @returns loginResponse
   */
  resetpassword(model: LoginData): Observable<string> {
    let url = this.BACK_END_HOST + 'auth/resetpassword';
    return this.http
      .post<LoginData>(url, model)
      .map((response: any) => {
        let data = response;
        if (data.status != 'Fail') {
          this.processLoginData(data, 'Custom');
        }
        return data;
      })
      .catch(this.handleErrorObservable);
  }

  /*
  * @param {any} model using old password we can change into new password
  * 
  * @example
  * changepassword()
  *
  * @returns loginResponse  
  */
  changepassword(model: ChangePassword): Observable<string> {
    let url = this.BACK_END_HOST + 'auth/changepassword';
    model.username = this.loginDetails.userDetails.email;
    return this.http
      .post<ChangePassword>(url, model)
      .map((response: any) => {
        let data = response;
        //Doss - what if data not available
        if (data) {
          return data;
        }
      })
      .catch(this.handleErrorObservable);
  }
  /**
   * Doss Not making use of Register Return value
   * @param {any} model register the new user
   *
   * @example
   * register()
   *
   * @returns response
   */
  register(model: Register): Observable<string> {
    let url = this.BACK_END_HOST + 'auth/register';
    return this.http
      .post<Register>(url, model)
      .map((response: any) => {
        let data = response;
        if (data.status != 'Fail') {
          return data;
        } else {
          return data.error;
        }
      })
      .catch(this.handleErrorObservable);
  }

  /**
   * Doss not making use of Interface EditUser
   * @param {any} model edit the user
   *
   * @example
   * editUser()
   *
   * @returns response
   */
  editUser(model: EditUser): Observable<string> {
    let url = this.BACK_END_HOST + 'auth/updateUser';
    return this.http
      .post<EditUser>(url, model)
      .map((response: any) => {
        let data = response;
        if (data.status != 'Fail') {
          this.processLoginData(data, 'Custom');
        }
        return data;
      })
      .catch(this.handleErrorObservable);
  }

  /**
   * @param {any} error  describing the error
   *
   * @example
   * handleError(handle the error with current route get the stack trace)
   *
   * @returns None
   */
  private handleErrorObservable(error: Response | any) {
    return Observable.throw(error.message || error);
  }

  /* Not required created as separate Service - will be deleted Later.
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
  */
}
