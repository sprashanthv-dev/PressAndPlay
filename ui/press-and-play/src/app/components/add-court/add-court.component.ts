import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { AddCourt } from 'src/app/models/add-court';
import { Address } from 'src/app/models/address';
import { Time } from 'src/app/models/time';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-court',
  templateUrl: './add-court.component.html',
  styleUrls: ['./add-court.component.css']
})
export class AddCourtComponent implements OnInit {

  address : Address = {
    country : '',
    line1 : '',
    line2 : "",
    state : '',
    city : '',
    pincode : ''
  }

  addCourtForm: AddCourt = {
    name: '',
    address: this.address,
    location: '',
    phone: '',
    availableSlots: [],
    sportType: ''
  };

  slot1Start : Time = {
    hour: 0,
    minute: 0
  }

  slot1End : Time = {
    hour: 0,
    minute: 0
  }

  slot2Start : Time = {
    hour: 0,
    minute: 0
  }

  slot2End : Time = {
    hour: 0,
    minute: 0
  }

  slot3Start : Time = {
    hour: 0,
    minute: 0
  }
  
  slot3End : Time = {
    hour : 0,
    minute : 0
  }

  slot4Start : Time = {
    hour: 0,
    minute: 0
  }
  
  slot4End : Time = {
    hour : 0,
    minute : 0
  }

  serviceTypes : any = {};
  appMessages : any = {};
  toastrType : any = {};

  constructor(
    private modalRef: NgbActiveModal,
    private dataSrv : DataService,
    private utilSrv : UtilService,
    private httpSrv : HttpService) { }

  ngOnInit(): void {
    this.addCourtForm.address.country = PRESS_AND_PLAY_CONSTANTS.COUNTRY;
    
    let { SERVICE_TYPES, APP_MESSAGES, TOASTR_TYPES } = PRESS_AND_PLAY_CONSTANTS;
    
    this.serviceTypes = SERVICE_TYPES;
    this.appMessages = APP_MESSAGES;
    this.toastrType = TOASTR_TYPES;
  }

  async handleAddCourt(addCourtForm : AddCourt) {
    
    console.log("Add court form ", addCourtForm);

    let slots: any[] = [
      { start: this.slot1Start, end : this.slot1End },
      { start : this.slot2Start, end : this.slot2End },
      { start : this.slot3Start, end : this.slot3End },
      { start : this.slot4Start, end : this.slot4End },
    ]

    let postData = this.dataSrv.buildAddCourtPostData(addCourtForm, slots);
   

    let fullAddress = this.utilSrv.buildFullAddress(addCourtForm.address);
    let latLon : any = await this.dataSrv.getLatLongForAddress(fullAddress); 

    let latitude = latLon.latitude.toString();
    let longitude = latLon.longitude.toString();

    postData.location = `${latitude},${longitude}`;

    let baseUrl = this.utilSrv.buildRequestBaseUrl(
      PRESS_AND_PLAY_CONSTANTS.SERVICE_TYPES.COURT);

    this.httpSrv
      .makePostApiCall("CREATE_COURT", baseUrl, postData)
      .subscribe({
        next : (response : any) => {
          this.utilSrv.showToastMessage(this.appMessages.ADD_COURT_MESSAGES.SUCCESS, this.toastrType.SUCCESS);
          this.closeModal(true);
        }, error : (err : any) => {
          console.log('Error ', err);
          this.utilSrv.showToastMessage(this.appMessages.ADD_COURT_MESSAGES.ERROR, this.toastrType.ERROR);
        }}
      )
  }

  closeModal(status : boolean) {
    console.log("Status ", status);
    this.modalRef.close(status);
  }

}
