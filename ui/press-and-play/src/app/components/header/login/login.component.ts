import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { LoginForm } from 'src/app/models/login-form';
import { DataService } from 'src/app/services/data.service';
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

  constructor(private modalRef: NgbActiveModal,
    private dataSrv : DataService,
    private utilSrv: UtilService,
    private http_service: HttpService,
    private storageSrv: StorageService) { }

  ngOnInit(): void {
    let { 
      BASE_URL, 
      LOCAL_STORAGE_DETAILS,
      APP_MESSAGES,
      TOASTR_TYPES
    } = PRESS_AND_PLAY_CONSTANTS;

    this.baseUrl = BASE_URL;
    this.loginMessages = APP_MESSAGES.LOGIN_MESSAGES
    this.toastrType = TOASTR_TYPES
    this.localStorageDetails = LOCAL_STORAGE_DETAILS;

    console.log(this.localStorageDetails)
  }

  handleLogin(
    loginForm: LoginForm) {
    console.log(loginForm);

    console.log(this.localStorageDetails.details)
    let {key, details} = this.localStorageDetails

    this.http_service
        .makePostApiCall("LOGIN_USER", environment.baseUrl, JSON.stringify(loginForm))
        .subscribe({
          next: (val: HttpResponse<any>) => {
            
            console.log(val)
            let session_id = val.headers.get('User-Session-Id')
            let {id} = val.body
            console.log(session_id, id)
            details.userId = id
            details.userSessionId = session_id
            
            this.storageSrv.setValue(key, details)

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
