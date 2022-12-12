import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { CourtInfo } from 'src/app/models/court-info';
import { Slot } from 'src/app/models/slot';
import { AppStateService } from 'src/app/services/app-state.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';

import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-sports-catalog-item-detailed-view',
  templateUrl: './sports-catalog-item-detailed-view.component.html',
  styleUrls: ['./sports-catalog-item-detailed-view.component.css']
})
export class SportsCatalogItemDetailedViewComponent implements OnInit, OnDestroy {

  currentRating: any;
  userRating: any = null;

  slots: any[] = [];

  selectedSlot : Slot = {
    slot_id: null,
    time_start_hhmm: 0,
    time_end_hhmm: 0,
    status: 0
  };

  courtId: string | null = null;
  isRatingForFirstTime : boolean | null = null;
  subscriptions : Subscription[] = [];

  serviceTypes: any = {};
  appMessages : any = {};
  toastrType : any = {};

  courtDetails!: CourtInfo;
  isFetched : boolean = false;
  isLoggedIn : boolean = false;

  userLoginStatusRef : any;

  constructor(
    private httpSrv: HttpService,
    private route: ActivatedRoute,
    private utilSrv: UtilService,
    private appStateSrv : AppStateService,
    private dataSrv: DataService) { }

  ngOnInit(): void {

    this.serviceTypes = PRESS_AND_PLAY_CONSTANTS.SERVICE_TYPES;
    this.appMessages = PRESS_AND_PLAY_CONSTANTS.APP_MESSAGES;
    this.toastrType = PRESS_AND_PLAY_CONSTANTS.TOASTR_TYPES;

    this.userLoginStatusRef = this.appStateSrv.userLoginStatus.subscribe((val: boolean) => {
      this.isLoggedIn = val;
    })

    this.route.params.subscribe((params: Params) => {
      this.courtId = params['id'];
      this.fetchCourtDetailsById();
    })

    this.subscriptions.push(this.userLoginStatusRef);
  }

  ngOnDestroy() : void {
    this.subscriptions.forEach((subscription : Subscription) => subscription.unsubscribe());
  }

  fetchCourtDetailsById() {
    if (!this.utilSrv.isNullOrUndefined(this.courtId)) {

      let baseUrl = this.utilSrv.buildRequestBaseUrl(this.serviceTypes.COURT);

      let options = {
        urlParams: {
          id: this.courtId
        }
      }

      this.httpSrv
        .makeGetApiCall("GET_COURT_DETAILS_BY_ID", baseUrl, options)
        .subscribe({
          next : (response : any) => {
            this.courtDetails = response;
            this.courtDetails = this.dataSrv.formatCourtInfoResponse(this.courtDetails);
            this.slots = this.courtDetails.availableSlots;
            this.isFetched = true;
          }, error : (err : any) => {
            console.log("Error ", err);
            this.isFetched = false;
          }
        })
    }
  }

  handleUserRating() {

    if (this.isRatingForFirstTime) {

      let baseUrl = this.utilSrv.buildRequestBaseUrl(this.serviceTypes.COURT);
      baseUrl = `${baseUrl}court/${this.courtId}/`;

      let postData = {
        rating: this.userRating
      }

      this.httpSrv
        .makePostApiCall("RATE_COURT", baseUrl, postData)
        .subscribe({
          next : (response : any) => {
            this.courtDetails = response;
            this.utilSrv.showToastMessage(this.appMessages.RATING_MESSAGES.SUCCESS, this.toastrType.SUCCESS);
            this.userRating = 0;
          }, error : (err : any) => {
            this.utilSrv.showToastMessage(this.appMessages.RATING_MESSAGES.ERROR, this.toastrType.ERROR);
          }
        })
    } else {
      console.log("Initial load");

      this.isRatingForFirstTime = true;
    }

  }

  handleSlotSelection(slot: Slot) {

    //* Check if any slot has been previously selected
    //* If so unselect them before selecting another slot

    this.slots.forEach((slot: Slot) => {

      if (slot.selected && !slot.booked) {
        slot.selected = false;
      }
    })

    let selectedSlotIndex = this.slots.findIndex((eachSlot: Slot) => eachSlot.slot_id === slot.slot_id);
    let slotInfo: Slot = this.slots[selectedSlotIndex];

    if (!slot.booked) {
      this.slots[selectedSlotIndex] = {
        ...slotInfo,
        selected: !slotInfo.selected
      }
  
      this.selectedSlot = {...slotInfo };
    } 
  }

  handleSlotBooking() {

    let baseUrl = this.utilSrv.buildRequestBaseUrl(this.serviceTypes.COURT);

    baseUrl = `${baseUrl}court/${this.courtId}/slot/${this.selectedSlot.slot_id}/`;

    this.httpSrv
      .makePostApiCall("BOOK_SLOT_FOR_COURT", baseUrl, {})
      .subscribe({
        next : (response : any) => {
          this.utilSrv.showToastMessage(this.appMessages.BOOKING_SLOT_MESSAGES.SUCCESS, this.toastrType.SUCCESS);
          this.fetchCourtDetailsById();
        }, 
        error : (err : any) => {
          console.log('Error ', err);
          this.utilSrv.showToastMessage(this.appMessages.BOOKING_SLOT_MESSAGES.ERROR, this.toastrType.ERROR);
        }
      })
  }
}
