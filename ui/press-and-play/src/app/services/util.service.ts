import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Address } from "../models/address";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { PRESS_AND_PLAY_CONSTANTS } from "../constants/proj.cnst";

@Injectable({
  providedIn: "root"
})

//* Utility related functions (time, date etc.)
//* will be handled by this service
export class UtilService {

  constructor(private toastrSrv : ToastrService) { }

  checkIfObjectKeyHasValues(obj: any): boolean {
    
    return !this.isNullOrUndefined(obj) && !this.isStringEmpty(obj) ? Object.keys(obj).length > 0 : false;
  }

  isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  isStringEmpty(value: string | undefined | null): boolean {
    return value === "";
  }

  isStringUndefined(value : string | null | undefined) : boolean {
    return value === undefined;
  }

  isStringNotNullOrUndefinedAndNotEmpty(value: string | undefined | null): boolean {
    return !this.isNullOrUndefined(value)
      && !this.isStringEmpty(value);
  }

  trimStringLength(input: string | undefined, characterLimit : number) {

    if (this.isStringUndefined(input)) {
      return input;
    } else  {
      return `${input?.slice(0, characterLimit + 1)} ..`;
    }
  }

  splitString(input: string, delimiter: string) {
    return input?.split(delimiter, 10);
  }

  showToastMessage(message : string, toastrType : string) {
    
    if (toastrType === PRESS_AND_PLAY_CONSTANTS.TOASTR_TYPES.SUCCESS) {
      this.toastrSrv.success(message);
    } else {
      this.toastrSrv.error(message);
    }
  }

  isAnyObjectValueNull(inputObj : any) {

    if (!this.isNullOrUndefined(inputObj) && Object.keys(inputObj).length > 0) {

      for (let key in inputObj) {

        let value = inputObj[key as keyof typeof inputObj];

        if (this.isNullOrUndefined(value)) {
          return true;
        }
      }
    } else {
      return true;
    }

    return false;
  }

  isUrlInExcludedList(url: string) {

    let excludedUrls = PRESS_AND_PLAY_CONSTANTS.EXCLUDED_URLS;

    for (let excludedUrl of excludedUrls) {

      if (url.includes(excludedUrl) &&
        !url.includes("book") &&
        !url.includes("rating") &&
        !url.includes("court/create")) {
        return true;
      }
    }

    return false;
  }

  buildRequestBaseUrl(serviceType : string) {

    let requestUrl = null;

    let serviceTypes = PRESS_AND_PLAY_CONSTANTS.SERVICE_TYPES;
    let { baseUrl, ports, apiSuffix } = environment;

    if (serviceType === serviceTypes.USER) {
      requestUrl = `${baseUrl}${ports.user}${apiSuffix}`;
    } else if (serviceType === serviceTypes.COURT) {
      requestUrl = `${baseUrl}${ports.court}${apiSuffix}`;
    } else {
      requestUrl = `${baseUrl}${ports.events}${apiSuffix}`;
    }

    return requestUrl;
  }

  formatTime(time : number) {

    let hours = time / 100;
    let minutes = time % 100;

    return `${hours}:${minutes}0`;
  }

  buildTime(hour : number) {
    return hour * 100;
  }

  buildFullAddress(address : Address) {

    let { line1, line2, country, state, pincode, city } = address;

    if (line2 !== ' ') {
      return `${line1},${line2},${city},${state},${country},${pincode}`;
    } else {
      return `${line1},${city},${state},${country},${pincode}`;
    }
  }
}