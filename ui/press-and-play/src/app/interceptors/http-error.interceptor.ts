import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage-service';
import { UtilService } from '../services/util.service';
import { PRESS_AND_PLAY_CONSTANTS } from '../constants/proj.cnst';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router : Router,
    private storageSrv : StorageService,
    private utilSrv :  UtilService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler)
    : Observable<HttpEvent<unknown>> {
    
    return next.handle(request).pipe(

      catchError((error : HttpErrorResponse) =>  {

        //* If session expires, redirect user to login screen
        //* and clear local storage
        if (error.status === HttpStatusCode.Forbidden) {

          let { TOASTR_TYPES, APP_MESSAGES } = PRESS_AND_PLAY_CONSTANTS;
          
          this.utilSrv.showToastMessage(
            APP_MESSAGES.SESSION_MESSAGES.EXPIRED, 
            TOASTR_TYPES.SUCCESS);

          this.storageSrv.clearStorage();

          setTimeout(() => this.router.navigate(['', 'catalog']), 2000);
        }

        console.log("Error interceptor ", error.message);

        return throwError(() => new Error(error.message));
      })
    )

  }
}
