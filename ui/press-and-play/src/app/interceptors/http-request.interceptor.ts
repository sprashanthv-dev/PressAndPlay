import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { PRESS_AND_PLAY_CONSTANTS } from '../constants/proj.cnst';
import { StorageService } from '../services/storage-service';
import { UtilService } from '../services/util.service';

@Injectable({
  providedIn : "root"
})
export class HttpRequestInterceptor implements HttpInterceptor {

  excludedUrls = PRESS_AND_PLAY_CONSTANTS.EXCLUDED_URLS;

  constructor(
    private storageSrv : StorageService,
    private utilSrv : UtilService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {

    let isUrlExcluded = this.utilSrv.isUrlInExcludedList(request.url);

    if (!isUrlExcluded) {
      return next.handle(this.addUserSessionId(request));
    } else {
      return next.handle(request);
    }
  }

  addUserSessionId(request: HttpRequest<any>) {

    let userInfo = this.storageSrv
      .getValue(PRESS_AND_PLAY_CONSTANTS.LOCAL_STORAGE_DETAILS.key);

    let { userSessionId } = userInfo;

    return request.clone({
      setHeaders: {
        authorization: userSessionId
      }
    })
  }
}
