import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { CourtInfo } from 'src/app/models/court-info';
import { Slot } from 'src/app/models/slot';
import { AppStateService } from 'src/app/services/app-state.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-sports-catalog-item-detailed-view',
  templateUrl: './sports-catalog-item-detailed-view.component.html',
  styleUrls: ['./sports-catalog-item-detailed-view.component.css']
})
export class SportsCatalogItemDetailedViewComponent implements OnInit {

  currentRating: any;
  userRating: any;

  slots: any[] = [];
  prevSlotId: string | null = null;

  courtId: string | null = null;
  serviceTypes: any = {};

  courtDetails!: CourtInfo;
  isFetched : boolean = false;
  isLoggedIn : boolean = false;

  constructor(
    private httpSrv: HttpService,
    private route: ActivatedRoute,
    private utilSrv: UtilService,
    private appStateSrv : AppStateService,
    private dataSrv: DataService) { }

  ngOnInit(): void {

    this.serviceTypes = PRESS_AND_PLAY_CONSTANTS.SERVICE_TYPES;

    this.appStateSrv.userLoginStatus.subscribe((val: boolean) => {
      this.isLoggedIn = val;
    })

    this.route.params.subscribe((params: Params) => {
      this.courtId = params['id'];
      this.fetchCourtDetailsById();
    })
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
    // call rating API
    console.log(this.userRating)

  }

  handleSlotSelection(slot: Slot) {

    //* Check if any slot has been previously selected
    //* If so unselect them before selecting another slot

    this.slots.forEach((slot: Slot) => {

      if (slot.selected) {
        slot.selected = false;
      }
    })

    let selectedSlotIndex = this.slots.findIndex((eachSlot: Slot) => eachSlot.slot_id === slot.slot_id);
    let slotInfo: Slot = this.slots[selectedSlotIndex];

    this.slots[selectedSlotIndex] = {
      ...slotInfo,
      selected: !slotInfo.selected
    }
  }
}
