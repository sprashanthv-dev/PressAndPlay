import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { Address } from 'src/app/models/address';
import { RegisterForm } from 'src/app/models/register-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //TODO : 1) Form Validation (Required) 2) Request Body Creation

  constructor(private modalRef : NgbActiveModal) { }

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
    dateOfBirth: '',
    userType: '',
    address : this.address,
    gender: ''
  }

  //* State Variables
  isUserManager : boolean = false;

  ngOnInit(): void {
    let { USERTYPE, COUNTRY } = PRESS_AND_PLAY_CONSTANTS;

    this.userTypeConstants = USERTYPE;
    this.registerForm.address!.country = COUNTRY;

    this.registerForm.userType = this.userTypeConstants.CUSTOMER;
  }

  handleRegistration(
    registerForm: RegisterForm, 
    formState : NgForm) { }

  handleUserTypeSelection() {
    this.isUserManager = this.registerForm.userType === this.userTypeConstants.CUSTOMER 
      ? false : true;
  }

  closeModal() {
    this.modalRef.close();
  }
}