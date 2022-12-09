import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { UtilService } from './util.service';
import { PRESS_AND_PLAY_CONSTANTS } from '../constants/proj.cnst';

@Injectable({
  'providedIn': 'root'
})

export class HttpService {
  constructor(
    private http: HttpClient,
    private utilSrv: UtilService) { }

  makeGetApiCall(apiEndpoint: string, baseUrl: string, options?: any) : Observable<any> {
    let endpoint = this.getApiEndPoint(apiEndpoint);

    if(this.utilSrv.isStringNotNullOrUndefinedAndNotEmpty(endpoint)) {

      if (this.utilSrv.checkIfObjectKeyHasValues(options)) {
        let { endPoint, headers, paramsObj } = this.buildRequestOptions(endpoint, options);
        return this.http.get(baseUrl + endPoint, {
          headers,
          params: paramsObj
        })
      } else {
        return this.http.get(baseUrl + endpoint);
      }
    } else {
      console.log("Api endpoint should not be null or undefined !");
      return of(null);
    }

  }

  makeGetApiCallWithPromise(apiEndpoint: string, baseUrl: string, options?: any) : Promise<any> {
    let endpoint = this.getApiEndPoint(apiEndpoint);

    let promise = new Promise((resolve, reject) => {

      if(this.utilSrv.isStringNotNullOrUndefinedAndNotEmpty(endpoint)) {

        let { endPoint, headers, paramsObj } = this.buildRequestOptions(endpoint, options);

        this.http
        .get(baseUrl + endPoint, {
          headers,
          params: paramsObj
        })
        .subscribe({
          next: (response : any) => {
            resolve(response);
          },
          error : (err : any) => {
            console.log("Error in fetching resource ", err);
            reject(err);
          }
        })
      } else {
        reject("Api endpoint should not be null or undefined !");
      }
    })
    return promise;
  }

  makePostApiCall(apiEndPoint : string, baseUrl : string, postData : any, options?:any) : Observable<any> {
    
    let endpoint = this.getApiEndPoint(apiEndPoint);

    if(this.utilSrv.isStringNotNullOrUndefinedAndNotEmpty(endpoint)) {

      if (this.utilSrv.checkIfObjectKeyHasValues(options)) {
        let { endPoint, headers, observeParams, paramsObj } = this.buildRequestOptions(endpoint, options);
        return this.http.post(baseUrl + endPoint, postData, {
          headers,
          observe: observeParams,
          params: paramsObj
        })
        
      } else {
        return this.http.post(baseUrl + endpoint, postData);
      }
    } else {
      console.log("Api endpoint should not be null or undefined !");
      return of(null);
    }
  }

  getApiEndPoint(endpoint: string) : string | null {

    let { API_MAPPING } = PRESS_AND_PLAY_CONSTANTS;
    let endPoint = API_MAPPING[endpoint as keyof typeof API_MAPPING];
    if(this.utilSrv.isStringNotNullOrUndefinedAndNotEmpty(endPoint)) {
      return endPoint;
    } else {
      return null;
    }
  }

  addQueryParamsToEndPoint(queryParams: any) : HttpParams {
    let params: HttpParams = new HttpParams();

    for(let key in queryParams) {
      let value = queryParams[key];
      params = params.set(key, value);
    }

    return params;
  }

  addOptionsToEndPoint(apiEndPoint: string | null, options: any) : string | null {
    let values = Object.values(options);

    values.forEach((value: any) => {
       apiEndPoint += `/${value}`
       console.log(value);
    })

    return apiEndPoint;
  }
  
  addHeadersToRequest(headers: any) : HttpHeaders {
    let header: HttpHeaders = new HttpHeaders();

    for(let key in headers) {
      let value = headers[key];
      header.set(key, value);
    }

    return headers;
  }

  addObserveParamsToRequest(value: any = 'body' || 'response') : any {
    let params = value
    return params;
  }

  buildRequestOptions(endpoint: any, options: any) {
    let paramsObj = undefined;
    let headers = undefined;
    let observeParams = undefined;

    let isUrlParamsPresent = this.utilSrv.checkIfObjectKeyHasValues(options['urlParams']);
    let isQueryParamsPresent = this.utilSrv.checkIfObjectKeyHasValues(options['queryParams']);
    let isHeadersPresent = this.utilSrv.checkIfObjectKeyHasValues(options['headers']);
    let isObserveParamPresent = this.utilSrv.checkIfObjectKeyHasValues(options['observe']);
    if (isUrlParamsPresent) {
      endpoint = this.addOptionsToEndPoint(endpoint, options['urlParams']);
    }

    if (isQueryParamsPresent) {
      paramsObj = this.addQueryParamsToEndPoint(options['queryParams']);
    }

    if (isHeadersPresent) {
      headers = this.addHeadersToRequest(options['headers']);
    }
    if(isObserveParamPresent)
    {
      observeParams = this.addObserveParamsToRequest(options['observe'])
    }
    return {
      endPoint: endpoint,
      headers,
      observeParams,
      paramsObj
    }
  }
}