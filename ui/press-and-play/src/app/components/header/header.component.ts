import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { AppStateService } from 'src/app/services/app-state.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage-service';
import { UtilService } from 'src/app/services/util.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logoutMessages: any;
  toastrTypes: any;
  baseUrl: string = "";
  localStorageDetails: any = {}

  isLoggedIn: boolean | undefined;

  constructor(
    private modal: NgbModal,
    private storageSrv: StorageService,
    private httpSrv: HttpService,
    private utilSrv: UtilService,
    private appStateSrv: AppStateService) {
  }

  ngOnInit(): void {
    this.appStateSrv.userLoginStatus.subscribe((val: boolean) => {
      this.isLoggedIn = val;
    })

    let {
      APP_MESSAGES,
      TOASTR_TYPES,
      BASE_URL,
      LOCAL_STORAGE_DETAILS
    } = PRESS_AND_PLAY_CONSTANTS

    this.logoutMessages = APP_MESSAGES.LOGOUT_MESSAGES;
    this.toastrTypes = TOASTR_TYPES;
    this.baseUrl = BASE_URL
    this.localStorageDetails = LOCAL_STORAGE_DETAILS;
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

        this.httpSrv
          .makeGetApiCall("GET_USER", this.baseUrl, options)
          .subscribe({
              next: (response) => {
                console.log("Profile Response ", response);
              },
              error: (err) => {
                console.log(err);
              }
            }
          )

        popOverRef.open({ details: { 'name': 'value' } });
      }
    }
  }

  handleLogin() {
    this.modal.open(LoginComponent, { size: 'md' });
  }

  handleSignUp() {
    this.modal.open(RegisterComponent, { size: 'lg' });
  }

  //TODO: Call logout api to terminate current session at backend
  handleLogout() {
    this.storageSrv.clearStorage();
    this.utilSrv.showToastMessage(this.logoutMessages.SUCCESS, this.toastrTypes.SUCCESS);

    //* Set user as logged out
    this.appStateSrv.setUserLoginStatus(false);
  }
}
