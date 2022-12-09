import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginForm } from 'src/app/models/login-form';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
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
  constructor(private modalRef: NgbActiveModal,
    private dataSrv : DataService,
    private http_service: HttpService) { }

  ngOnInit(): void {
  }

  handleLogin(
    loginForm: LoginForm,
    formState: NgForm) {
    console.log(loginForm);

    let response = this.http_service.makePostApiCall("LOGIN_USER", environment.baseUrl, loginForm)
    response.subscribe((val) =>
      console.log(val)
    )
    // store session id in local storage
    // show alert that user has logged in
  }


  closeModal() {
    this.modalRef.close();
  }

}
