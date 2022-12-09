import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { UtilService } from "./util.service";

@Injectable({
  'providedIn': 'root'
})

export class StorageService {
  isSessionIdSet = new Subject<boolean>();

  constructor(private utilSrv : UtilService) { }

  getValue(key: string) : string | null {

    let value = localStorage.getItem(key);
    if(this.utilSrv.isStringNotNullOrUndefinedAndNotEmpty(value))
    {
      this.isSessionIdSet.next(true);
      return JSON.parse(value!);
    }
    else{
      this.isSessionIdSet.next(false);
      return null;
    }
  }

  getValues(keys: string[]) : string[] | null {

    let values : any = [];
    keys.forEach(key => {

      let value = localStorage.getItem(key);

      if(this.utilSrv.isStringNotNullOrUndefinedAndNotEmpty(value)) {
        values.push(value);
      }
    })

    return values;
  }

  setValue(key: string, value: any): void {

    if (this.utilSrv.isStringNotNullOrUndefinedAndNotEmpty(key)) {
      localStorage.setItem(key, JSON.stringify(value));
      this.isSessionIdSet.next(true);
    }
    
  }

  deleteValue(key: string) : void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
    this.isSessionIdSet.next(false);
  } 
}