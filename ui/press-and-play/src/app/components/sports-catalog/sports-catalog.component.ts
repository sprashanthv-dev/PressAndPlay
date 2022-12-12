import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';

import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { LocationInfo } from 'src/app/models/location-info';
import { SportsCatalogItem } from 'src/app/models/sports-catalog-item';

import { AppStateService } from 'src/app/services/app-state.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage-service';
import { UtilService } from 'src/app/services/util.service';
import { AddCourtComponent } from '../add-court/add-court.component';

@Component({
  selector: 'app-sports-catalog',
  templateUrl: './sports-catalog.component.html',
  styleUrls: ['./sports-catalog.component.css']
})
export class SportsCatalogComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = []
  locationRef: any;

  userLoginStatusRef : any;

  headerTitle = PRESS_AND_PLAY_CONSTANTS.CATALOG_LIST_HEADER;
  headerLocation: string = this.headerTitle.DEFAULT;
  userRoles : any = {};

  latitude: string | null = null;
  longitude: string | null = null;

  isLoggedIn : boolean = false;
  currentRole : string | null = null;

  constructor(
    private utilService: UtilService,
    private appStateService: AppStateService,
    private storageSrv : StorageService,
    private modal: NgbModal,
    private httpSrv: HttpService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  sportsCatalogList: SportsCatalogItem[] = [];
  serviceTypes: any = {};

  ngOnInit(): void {

    this.userRoles = PRESS_AND_PLAY_CONSTANTS.USER_ROLES;

    this.userLoginStatusRef = this.appStateService.userLoginStatus.subscribe((status : boolean) => {
      this.isLoggedIn = status;

      if (this.isLoggedIn) {
          
          let userInfo = this.storageSrv.getValue('userInfo');
          let { name, role } = userInfo;

          this.currentRole = role;

          if (this.currentRole === this.userRoles.MANAGER) {
            this.headerLocation = `${this.headerTitle.MANAGER} ${name}`
          }
      } else {
        this.headerLocation = this.headerTitle.DEFAULT;
        this.currentRole = null;
      }
    })

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
    this.subscriptions.push(this.userLoginStatusRef);
  }

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
        }, error: (err: any) => {
          console.log("Error ", err);
        }
      })
  }

  handleCourtAdd() {
    const modalRef = this.modal.open(AddCourtComponent, { size: 'lg' });

    modalRef.closed.subscribe((status: any) => {

      if (status) {
        this.fetchAllCatalogItems();
      }
    })
  }
}
