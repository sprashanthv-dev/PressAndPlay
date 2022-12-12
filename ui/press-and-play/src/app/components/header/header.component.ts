import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { AppStateService } from 'src/app/services/app-state.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage-service';
import { UtilService } from 'src/app/services/util.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logoutMessages: any;
  toastrTypes: any;
  baseUrl: string = "";
  localStorageDetails: any = {};

  serviceTypes : any = {};
  notificationMessages : any = {};

  isLoggedIn: boolean | undefined;
  profileDetails : any = {};

  faBell = faClock;
  currentRole : string | null = null;
  isCollapsed : boolean = true;

  messages : any[] = [];

  constructor(
    private modal: NgbModal,
    private storageSrv: StorageService,
    private httpSrv: HttpService,
    private utilSrv: UtilService,
    private dataSrv : DataService,
    private appStateSrv: AppStateService) {
  }

  ngOnInit(): void {

    this.appStateSrv.userLoginStatus.subscribe((val: boolean) => {
      this.isLoggedIn = val;

      let userInfo = this.storageSrv.getValue('userInfo');

      if (!this.utilSrv.isNullOrUndefined(userInfo)) {
        let { role } = userInfo;
        this.currentRole = role;
    }

    })

    this.initializeState();
  }

  initializeState() {
    let {
      APP_MESSAGES,
      TOASTR_TYPES,
      BASE_URL,
      LOCAL_STORAGE_DETAILS,
      SERVICE_TYPES
    } = PRESS_AND_PLAY_CONSTANTS

    this.logoutMessages = APP_MESSAGES.LOGOUT_MESSAGES;
    this.toastrTypes = TOASTR_TYPES;
    this.baseUrl = BASE_URL
    this.localStorageDetails = LOCAL_STORAGE_DETAILS;
    this.serviceTypes = SERVICE_TYPES;
    this.notificationMessages = APP_MESSAGES.NOTIFICATION_MESSAGES;
  }

  togglePopOver(popOverRef: any) {

    if (popOverRef.isOpen()) {
      popOverRef.close();
    } else {
      
      let { key } = this.localStorageDetails;
      let userInfo = this.storageSrv.getValue(key);

      let userInfoExists = !this.utilSrv.isNullOrUndefined(userInfo) 
        && !this.utilSrv.isAnyObjectValueNull(userInfo);

      if (userInfoExists) {

        let { userId } = userInfo;

        let options = {
          urlParams : { userId },
        }

        let baseUrl = this.utilSrv.buildRequestBaseUrl(this.serviceTypes.USER);

        this.httpSrv
          .makeGetApiCall("GET_USER", baseUrl, options)
          .subscribe({
              next: (response) => {
                this.profileDetails = this.dataSrv.formatUserProfileResponse(response);
                popOverRef.open(this.profileDetails);
              },
              error: (err) => {
                console.log(err);
              }
            }
          )

      }
    }
  }

  handleLogin() {
    this.modal.open(LoginComponent, { size: 'md' });
  }

  handleSignUp() {
    this.modal.open(RegisterComponent, { size: 'lg' });
  }

  handleNotifications() {

    let baseUrl = this.utilSrv.buildRequestBaseUrl(this.serviceTypes.EVENTS);

    this.httpSrv.makeGetApiCall("GET_NOTIFICATIONS", baseUrl)
      .subscribe({
        next : (response : any) => {
          console.log("Response ", response);
          this.messages = this.dataSrv.formatNotificationMessages(response);
          console.log("Messages ", this.messages);
        },  
        error : (err : any) => {
          console.log("Error ", err);
          this.utilSrv.showToastMessage(this.notificationMessages.ERROR, this.toastrTypes.ERROR);
        }
      })
  }

  //TODO: Call logout api to terminate current session at backend
  handleLogout() {

    this.storageSrv.clearStorage();
    this.utilSrv.showToastMessage(this.logoutMessages.SUCCESS, this.toastrTypes.SUCCESS);

    //* Set user as logged out
    this.appStateSrv.setUserLoginStatus(false);
  }
}
