import {
  Injectable,
  Component,
  OnInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

import { LoggerService, LocalStorageService, GlobalService } from '@app/core';
import { AuthService } from '@app/core/auth//auth.service';

import * as shorternURLModel from '@app/models/shortenerURLModel/models';
import * as getURLModel from '@app/models/getShortenerURLsModel/models';
import {
  ActualURL,
  urlDetails,
  urlData,
  urlDetailsData,
  PackagePriceToggle,
  AllLinksOfAdmin,
  DomainData,
  billingAddressModel,
  countriesData,
  PricingData,
  domainDataSet,
  addToCart
} from '@app/models';

export interface cartData {
  Error: boolean;
  data: {
    customName: string;
    domainName: string;
    url: string;
    email: string;
    orderId: string;
    status: String;
    startDate: String;
    endDate: String;
    _id: String;
  };
}

@Injectable()
export class UserService {
  BACK_END_HOST: any;
  isLoggedIn: boolean;
  model: any = {};
  urldata = [];
  // cartData:Array<string>=[];
  actualURL: ActualURL;
  public urlDetails: urlDetails;
  public urlData: urlData;
  urlDetailsData: urlDetailsData;
  isaddtoCart: boolean;
  packagePriceToggle: PackagePriceToggle;
  data = [];
  cartDataSet: cartData;
  currentDomain: String;
  domainData;
  // pricingData = new PricingData();
  pricingData: PricingData[] = [];
  domainDataSet = new domainDataSet();
  ordersInProgress: any = [];
  currentOrderDataSet;
  private pricingDataSubject = new BehaviorSubject<PricingData[]>(
    this.getterPricingData()
  );
  getPricingData = this.pricingDataSubject.asObservable();

  private domainDataSubject = new BehaviorSubject<domainDataSet>(
    this.getdomainData()
  );
  getdomainDataSet = this.domainDataSubject.asObservable();

  private addtoCartObject = new BehaviorSubject<boolean>(this.isAddedToCart());
  cartStatus = this.addtoCartObject.asObservable();

  /* private addtoCartDataObject = new BehaviorSubject<cartData>(this.getcartData());
     cartDataobjectSet = this.addtoCartDataObject.asObservable();*/

  private currentProcessingOrder = new BehaviorSubject<Object>(
    this.getcurrentProcessingOrderDetails()
  );
  currentProcessingOrderInfo = this.currentProcessingOrder.asObservable();

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    public loggerService: LoggerService,
    public globalService : GlobalService,
    private localStorage: LocalStorageService
  ) {
    this.BACK_END_HOST = this.globalService.BACK_END_HOST;
    
    let currentUser = this.localStorage.getItem('currentUser');
    if (currentUser != null) {
      this.authService.loginDetails = JSON.parse(currentUser);
    }
    this.urlDetails = {
      sNo: 0,
      shortUrl: '',
      domainName: '',
      customName: '',
      url: '',
      date: null,
      id: null,
      orderId: ''
    };
  }
  
  createShorternURL(model: shorternURLModel.PostData): Observable<any> {
    let URL = this.BACK_END_HOST + 'create';
    return this.http
      .post<urlDetailsData>(URL, model)
      .map(urlDetailsData => {
        let response = urlDetailsData;
        let errorStatus = response.error.status;
        console.log("data",response)
        if (errorStatus == false) {
          let docIndex = 0;
          this.urlDetails = {
            sNo: ++docIndex,
            shortUrl: model.domainName + '/' + response.data.customName,
            domainName: model.domainName,
            customName: response.data.customName,
            url: response.data.url,
            date: response.data.createdAt,
            id: response.data._id,
            orderId: response.data.orderId
          };
         
         return this.urlDetails;
        }

        if (errorStatus == true) {
          throw new Error(response.error.code);
        }
      })
      .catch(this.handleErrorObservable);
  }

  private isAddedToCart(): boolean {
    let email = 'sravanthi@smartrobos.com';
    this.model.email = email;
    /* this.getaddtoCartProducts(this.model.email ).subscribe(data=>{
           console.log(data);
         })*/

    return this.isaddtoCart;
  }

  setCart(isaddtoCart: boolean) {
    this.addtoCartObject.next(isaddtoCart);
  }

  /**
   * @param {any} model for Short Link Creation
   * @example
   * getData(get the all created urls )
   *
   * @returns all created urls
   */
  getData(model: getURLModel.PostData): Observable<any> {
//    this.loggerService.log(model);
    let URL = this.BACK_END_HOST + 'getUrldata';
    return this.http
      .post<urlData>(URL, model)
      .map(urlData => {
        let response = urlData;
        if (response.Error == false) {
          let docIndex = 0;
          this.urldata = [];
          for (let data = 0; data < response.data.length; data++) {
            for (let doc = 0; doc < response.data[data].docs.length; doc++) {
              this.urlDetails = {
                sNo: ++docIndex,
                shortUrl:
                  response.data[data].domain +
                  '/' +
                  response.data[data].docs[doc].customName,
                domainName: response.data[data].domain,
                customName: response.data[data].docs[doc].customName,
                url: response.data[data].docs[doc].url,
                date: response.data[data].docs[doc].createdAt,
                id: response.data[data].docs[doc]._id,
                orderId: ''
              };
              this.urldata.push(this.urlDetails);
            }
          }
          return this.urldata;
        }
        if (response.Error == true) {
          throw new Error('Error');
        }
      })
      .catch(this.handleErrorObservable);
  }

  /**
   * @param {any} model
   * @example
   * getDataFromServer(analytics data from server)
   *
   * @returns  data from server
   */
  getDataFromServer(model: any): Observable<any> {
    let URL = this.BACK_END_HOST + model.analyticsType;
    return this.http
      .post(URL, model)
      .map((response: Response) => {
        let data = response || {};
        return data;
      })
      .catch(this.handleErrorObservable);
  }

  getCountries(): Observable<any> {
    let URL = this.BACK_END_HOST + 'getAllCountryNames';
    return this.http.get(URL).map((response: Response) => {
      let data = response || {};
      return data;
    });
  }
  /**
   * @param {string} domain
   * @example
   * getPricingData( )
   *
   * @returns
   */

  getallLinksData(model: AllLinksOfAdmin): Observable<any> {
    let URL = this.BACK_END_HOST + 'getLinksdata';
    return this.http
      .post<AllLinksOfAdmin>(URL, model)
      .map(response => {
        let data = response || {};
        return data;
      })
      .catch(this.handleErrorObservable);
  }

  setCurrentDomainNameSet(currentDomainNameSet) {
    this.domainDataSet = currentDomainNameSet;
    this.domainDataSubject.next(this.domainDataSet);
    this.setCurrentDomain(currentDomainNameSet.domainName);
  }

  setCurrentDomain(domainData) {
    this.currentDomain = domainData;
    this.pricingData = null;
    this.getPricingDataFromServer().subscribe(
      response => {
        this.pricingData = response;
        this.pricingDataSubject.next(this.pricingData);
        //   return this.pricingData;
      },
      err => {
        console.log('Errror in fetching data in pricing table');
      }
    );
  }

  getPricingDataFromServer(): Observable<PricingData[]> {
    let URL = this.BACK_END_HOST + 'getPricingTables';
    let postURL = URL;
    return this.http.post<PricingData[]>(postURL, {
      domain: this.currentDomain
    });
  }
  getdomainData() {
    return this.domainDataSet;
  }
  getcartData() {
    return this.cartDataSet;
  }
  getterPricingData() {
    return this.pricingData;
  }

  /** Get Pricing tables data */
  getPricingDatabyToggle(model: PackagePriceToggle): Observable<any> {
    let URL = this.BACK_END_HOST + 'getPricingDataTablebyToggle';
    return this.http
      .post<PackagePriceToggle>(URL, this.model)
      .map(response => {
        let pricingDatabyToggle = response;
        if (pricingDatabyToggle) {
          return pricingDatabyToggle;
        } else {
          console.log('There is no data in server');
        }
      })
      .catch(this.handleErrorObservable);
  }

  /**
   * @param {string} model
   * @example
   * getActualURL(www.facebook.com)
   *
   * @returns  actual URL
   */
  getActualURL(model: ActualURL): Observable<any> {
    let URL = this.BACK_END_HOST + 'analytics/getURL';
    return this.http
      .post<ActualURL>(URL, model)
      .map(response => {
        let actualURL = response || {};
        return actualURL;
      })
      .catch(this.handleErrorObservable);
  }
  updateOrderID(model): Observable<any> {
    let URL = this.BACK_END_HOST + 'updateOrderID';
    return this.http
      .post(URL, model)
      .map(response => {
        let actualURL = response || {};
        return actualURL;
      })
      .catch(this.handleErrorObservable);
  }
  /** API to get particular domain dta for registred users */
  getDomainData(model: DomainData): Observable<any> {
    let URL = this.BACK_END_HOST + 'getDomainData';
    return this.http
      .post<DomainData>(URL, model)
      .map(response => {
        let domainData = response || {};

        return domainData;
      })
      .catch(this.handleErrorObservable);
  }
  /** API to update data for paid links */
  updateOrderData(model): Observable<any> {
    let URL = this.BACK_END_HOST + 'updateorderData';
    return this.http
      .post(URL, model)
      .map(response => {
        let orderData = response || {};
        console.log(orderData);
        return orderData;
      })
      .catch(this.handleErrorObservable);
  }

  /** API to update data for paid links */
  addToCart(model, routeData): Observable<any> {
    let URL = this.BACK_END_HOST + routeData;
    return this.http
      .post(URL, model)
      .map(response => {
        let cartData = response || {};
        console.log(cartData);
        return cartData;
      })
      .catch(this.handleErrorObservable);
  }

  setCurrentProcessingOrder(currentProcessingOrder) {
    this.currentOrderDataSet = currentProcessingOrder;
    this.currentProcessingOrder.next(this.currentOrderDataSet);
  }
  getcurrentProcessingOrderDetails() {
    return this.currentOrderDataSet;
  }
  getaddtoCartProducts(email): Observable<any> {
    let URL = this.BACK_END_HOST + 'getaddtoCartProducts';
    return this.http.post(URL, email).map((response: Response) => {
      let data: any = response || {};
      return data;
    });
  }
  updateCartData(orderId): Observable<any> {
    let model: any = {};
    model.orderId = orderId;
    let url = this.BACK_END_HOST + 'updateCartData';
    return this.http.post(url, model).map((response: Response) => {
      let data = response || {};
      return data;
    });
  }
  /**
   * @param {string} domain
   * @example
   * update Billing Address
   *
   * @returns
   */

  updateBillingAddress(model: billingAddressModel): Observable<any> {
    console.log(model);
    let URL = this.BACK_END_HOST + 'updateBillingAddress';
    return this.http
      .post<billingAddressModel>(URL, model)
      .map(response => {
        let data = response || {};
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
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
