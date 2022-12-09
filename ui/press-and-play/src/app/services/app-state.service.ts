import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class AppStateService {

  location = new Subject<string>();

  setLocation(location : string) {
    this.location.next(location);
  }

}