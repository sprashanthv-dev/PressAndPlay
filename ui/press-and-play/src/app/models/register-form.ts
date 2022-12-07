import { Address } from "./address";


export interface RegisterForm {
  email : string;
  password : string;
  firstName : string;
  lastName : string;
  address? : Address;
  phoneNumber : string;
  dateOfBirth : string;
  userType : string;
  gender : string;
  verificationDocument? : any
}