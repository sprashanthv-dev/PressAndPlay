import { Injectable } from "@angular/core";
import { UtilService } from "./util.service";

@Injectable({
  'providedIn': 'root'
})

export class StorageService {

  constructor(private utilSrv : UtilService) { }

  getValue(key: string) : string | null {

    let value = localStorage.getItem(key);

    return this.utilSrv.isStringNotNullOrUndefinedAndNotEmpty(value) 
      ? JSON.parse(value!) : null;
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
    }
    
  }

  deleteValue(key: string) : void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  } 
}