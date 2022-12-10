import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
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
      return `${input?.slice(0, characterLimit + 1)} ...`;
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

    if (Object.keys(inputObj).length > 0) {

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
}