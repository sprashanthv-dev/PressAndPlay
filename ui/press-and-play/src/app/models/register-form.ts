import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Address } from "./address";


export interface RegisterForm {
  email : string;
  password : string;
  firstName : string;
  lastName : string;
  address : Address;
  phoneNumber : string;
  dateOfBirth : NgbDate;
  userType : string;
  gender : string;
}