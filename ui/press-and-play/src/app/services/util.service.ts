import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

//* Utility related functions (time, date etc.)
//* will be handled by this service
export class UtilService {

  checkIfObjectKeyHasValues(obj: any): boolean {
    return Object.keys(obj).length > 0;
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

}