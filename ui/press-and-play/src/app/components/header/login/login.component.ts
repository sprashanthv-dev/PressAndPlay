import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginForm } from 'src/app/models/login-form';

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
  constructor(private modalRef: NgbActiveModal) { }

  ngOnInit(): void {
  }

  handleLogin(
    loginForm: LoginForm,
    formState: NgForm) {
    console.log(loginForm);
  }


  closeModal() {
    this.modalRef.close();
  }

}
