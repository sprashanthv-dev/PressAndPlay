import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { Address } from 'src/app/models/address';
import { RegisterForm } from 'src/app/models/register-form';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private modalRef : NgbActiveModal,
    private dataSrv : DataService) { }

  userTypeConstants : any;

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
  isUserManager : boolean = false;
  verificationDocument : File | null = null;

  ngOnInit(): void {
    let { USERTYPE, COUNTRY } = PRESS_AND_PLAY_CONSTANTS;

    this.userTypeConstants = USERTYPE;
    this.registerForm.address!.country = COUNTRY;

    this.registerForm.userType = this.userTypeConstants.CUSTOMER;
  }

  handleRegistration(
    registerForm: RegisterForm, 
    formState : NgForm) {

    console.log(registerForm);

    console.log(this.dataSrv.buildRegisterFormPostData(registerForm));
    console.log("------------------");
  }

  handleUserTypeSelection() {
    this.isUserManager = this.registerForm.userType === this.userTypeConstants.CUSTOMER 
      ? false : true;
  }

  handleFileUpload(uploadItem : any) {
    console.log(uploadItem.files);
  }

  closeModal() {
    this.modalRef.close();
  }
}