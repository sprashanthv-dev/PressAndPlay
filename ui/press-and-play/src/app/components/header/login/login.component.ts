import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { LoginForm } from 'src/app/models/login-form';
import { AppStateService } from 'src/app/services/app-state.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage-service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: LoginForm = {
    email: '',
    password: ''
  }

  baseUrl: any = {};
  loginMessages: any = {}
  localStorageDetails : any = {};
  toastrType : any = {};
  serviceTypes : any =  {};
  userRoles : any = {};

  constructor(
    private modalRef: NgbActiveModal,
    private utilSrv: UtilService,
    private http_service: HttpService,
    private storageSrv: StorageService,
    private appStateSrv : AppStateService) { }

  ngOnInit(): void {
    this.initializeState();
  }

  initializeState() {

    let {
      BASE_URL,
      LOCAL_STORAGE_DETAILS,
      APP_MESSAGES,
      TOASTR_TYPES,
      SERVICE_TYPES,
      USER_ROLES
    } = PRESS_AND_PLAY_CONSTANTS;

    this.baseUrl = BASE_URL;
    this.loginMessages = APP_MESSAGES.LOGIN_MESSAGES
    this.toastrType = TOASTR_TYPES
    this.localStorageDetails = LOCAL_STORAGE_DETAILS;
    this.serviceTypes = SERVICE_TYPES;
    this.userRoles = USER_ROLES;
  }

  handleLogin(
    loginForm: LoginForm) {

    let { key, details } = this.localStorageDetails;

    let baseUrl = this.utilSrv.buildRequestBaseUrl(this.serviceTypes.USER);
    console.log("Base url", baseUrl);

    this.http_service
        .makePostApiCall("LOGIN_USER", baseUrl, JSON.stringify(loginForm), {'observe': 'response'})
        .subscribe({
          next: (val: HttpResponse<any>) => {

            let session_id = val.headers.get('User-Session-Id');

            let { id, firstName, lastName, role } = val.body;

            let roleName = role === 0 ? this.userRoles.CUSTOMER : this.userRoles.MANAGER;

            details.userId = id
            details.userSessionId = session_id
            
            this.storageSrv.setValue(key, details);

            let userInfo = { name : `${firstName} ${lastName}`, role : roleName };
            this.storageSrv.setValue('userInfo', userInfo);
            this.appStateSrv.setUserLoginStatus(true);

            this.utilSrv.showToastMessage(this.loginMessages.SUCCESS, this.toastrType.SUCCESS)
            this.closeModal();
          },
          error: (err: any) => {
            console.log("Error in fetching resource ", err);
            this.utilSrv.showToastMessage(this.loginMessages.ERROR, this.toastrType.ERROR)
          }
        })
  }


  closeModal() {
    this.modalRef.close();
  }

}
