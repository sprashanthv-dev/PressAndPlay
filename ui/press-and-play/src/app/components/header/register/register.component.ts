import { Component, OnInit } from '@angular/core';

import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { Address } from 'src/app/models/address';
import { RegisterForm } from 'src/app/models/register-form';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage-service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private modalRef : NgbActiveModal,
    private dataSrv : DataService,
    private httpSrv : HttpService,
    private utilSrv : UtilService,
    private storageSrv : StorageService) { }

  //* Form Fields
  address : Address = {
    country : '',
    line1 : '',
    line2 : '',
    state : '',
    city : '',
    pincode : ''
  }

  registerForm: RegisterForm = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: new NgbDate(0, 0, 0),
    userType: '',
    address : this.address,
    gender: ''
  }

  //* State Variables
  userTypeConstants : any;
  baseUrl : string = '';
  localStorageDetails : any = {};
  registerMessages : any = {};
  toastrType : any = {};
  serviceTypes : any = {};

  ngOnInit(): void {
    this.initializeState();
  }

  initializeState() {
    let { USERTYPE, 
      COUNTRY, 
      BASE_URL, 
      LOCAL_STORAGE_DETAILS,
      APP_MESSAGES,
      SERVICE_TYPES
    } = PRESS_AND_PLAY_CONSTANTS;

    this.userTypeConstants = USERTYPE;
    this.registerForm.address!.country = COUNTRY;
    this.baseUrl = BASE_URL;

    this.registerMessages = APP_MESSAGES.REGISTER_MESSAGES;
    this.registerForm.userType = this.userTypeConstants.CUSTOMER;

    this.localStorageDetails = LOCAL_STORAGE_DETAILS;
    this.serviceTypes = SERVICE_TYPES;
  }

  handleRegistration(registerForm: RegisterForm) {

    let requestBody = this.dataSrv.buildRegisterFormPostData(registerForm);
    let baseUrl = this.utilSrv.buildRequestBaseUrl(this.serviceTypes.USER);

    let { key, details} = this.localStorageDetails;
    console.log(details)
    this.httpSrv
      .makePostApiCall("CREATE_USER", baseUrl, JSON.stringify(requestBody))
      .subscribe({
        next: (response: any) => {
          
          let { id } = response;

          details.userId = id;
          this.storageSrv.setValue(key, details);

          this.utilSrv.showToastMessage(this.registerMessages.SUCCESS, this.toastrType.SUCCESS)

          this.closeModal();
        },
        error: (err: any) => {
          console.log("Error in fetching resource ", err);
          this.utilSrv.showToastMessage(this.registerMessages.ERROR, this.toastrType.ERROR)
        }
      })
  }

  closeModal() {
    this.modalRef.close();
  }
}