import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { LocationInfo } from "../models/location-info";
import { StorageService } from "./storage-service";

@Injectable({
  providedIn: "root"
})

export class AppStateService {

  constructor(private storageSrv : StorageService) {}

  location = new Subject<LocationInfo>();

  setLocation(location : LocationInfo) {
    this.location.next(location);
  }

  userLoginStatus = new BehaviorSubject<boolean>(false);

  setUserLoginStatus(status : boolean) {
    this.userLoginStatus.next(status);
  }
}