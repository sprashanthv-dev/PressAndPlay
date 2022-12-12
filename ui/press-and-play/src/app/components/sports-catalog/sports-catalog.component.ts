import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { LocationInfo } from 'src/app/models/location-info';
import { SportsCatalogItem } from 'src/app/models/sports-catalog-item';

import { AppStateService } from 'src/app/services/app-state.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-sports-catalog',
  templateUrl: './sports-catalog.component.html',
  styleUrls: ['./sports-catalog.component.css']
})
export class SportsCatalogComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = []
  locationRef: any;

  headerTitle = PRESS_AND_PLAY_CONSTANTS.CATALOG_LIST_HEADER;
  headerLocation: string = this.headerTitle.DEFAULT;

  latitude: string | null = null;
  longitude: string | null = null;

  constructor(
    private utilService: UtilService,
    private appStateService: AppStateService,
    private httpSrv: HttpService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  sportsCatalogList: SportsCatalogItem[] = [];
  serviceTypes: any = {};

  ngOnInit(): void {

    this.serviceTypes = PRESS_AND_PLAY_CONSTANTS.SERVICE_TYPES;

    //TODO : Check if location is not empty before calling api
    this.fetchAllCatalogItems();

    this.locationRef = this.appStateService.location
      .subscribe((location: LocationInfo) => {

        let { address, latitude, longitude } = location;

        this.headerLocation = `${this.headerTitle.LOCATION}${address}`;
        this.latitude = latitude;
        this.longitude = longitude;

        this.fetchAllCatalogItems();
      })

    this.subscriptions.push(this.locationRef);
  }

  //TODO : Integrate get catalog items REST API
  fetchAllCatalogItems() {
    let baseUrl = this.utilService.buildRequestBaseUrl(this.serviceTypes.COURT);

    let options = {
      headers: {}
    };

    //* If both lat and long exist, pass it in request headers
    if (!this.utilService.isNullOrUndefined(this.latitude)
      && !this.utilService.isNullOrUndefined(this.longitude)) {

      options.headers = {
        location: `${this.latitude},${this.longitude}`
      }
    }

    this.httpSrv
      .makeGetApiCall("GET_COURT_LIST", baseUrl, options)
      .subscribe({
        next: (response: any) => {
          this.sportsCatalogList = response;
          console.log("Response ", response);
        }, error: (err: any) => {
          console.log("Error ", err);
        }
      })

  }
}
