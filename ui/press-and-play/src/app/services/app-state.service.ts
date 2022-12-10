import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { StorageService } from "./storage-service";

@Injectable({
  providedIn: "root"
})

export class AppStateService {

  constructor(private storageSrv : StorageService) {}

  location = new Subject<string>();

  setLocation(location : string) {
    this.location.next(location);
  }

  userLoginStatus = new BehaviorSubject<boolean>(false);

  setUserLoginStatus(status : boolean) {
    this.userLoginStatus.next(status);
  }
}