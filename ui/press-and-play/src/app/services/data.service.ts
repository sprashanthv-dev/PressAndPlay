import { Injectable } from "@angular/core";
import { RegisterForm } from "../models/register-form";
import { SportsCatalogItem } from "../models/sports-catalog-item";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: "root"
})

//* All data related manipulations (formatter) will 
//* be handled by this service.
export class DataService {

  constructor(private utilSrv : UtilService) {}

  mockCatalogItems: SportsCatalogItem[] = [{
    id : "1",
    name: "Lotee Football Stadium",
    distance: 16,
    availableSlots: 10,
    location: "Athens North, Boulder",
    pricePerHour: 20,
    rating: 4.5
  },
  {
    id : "2",
    name: "Rush International Stadium",
    distance: 25,
    availableSlots: 15,
    location: "Pearl Street, Boulder",
    pricePerHour: 10,
    rating: 3.8
  }, 
  {
    id : "3",
    name: "Javaa Stadium",
    distance: 10,
    availableSlots: 5,
    location: "505 27th Way, Boulder",
    pricePerHour: 25,
    rating: 4.3
  },
]

  getMockCatalogItems() : SportsCatalogItem[] {
    return this.mockCatalogItems;
  }

  formatCatalogItem(catalogItem : SportsCatalogItem, characterLimit : number) {

    let formattedCatalogItem = { ...catalogItem };

    formattedCatalogItem.altName = this.utilSrv.trimStringLength(
      formattedCatalogItem.name, characterLimit);

    formattedCatalogItem.altLocation = this.utilSrv.trimStringLength(
        formattedCatalogItem.location, characterLimit);

    return formattedCatalogItem;
  }

  // parse results from /autocomplete api
  parseAutoCompleteResponse(value: any): any[] {
      let output = value;

      let addresses = output.map((item: { properties: any; }) => item.properties);
      let sscValues = addresses.map((item: { street: string; state: string; country: string; }) => item.street + ", " + item.state + ", " + item.country);
      let uniqueAddr : Set<string> = new Set(sscValues);
      let result = Array.from(uniqueAddr.values());
      
      let addressArr: { addr: string; }[] = [];

      result.forEach((item : string) => {

        let obj = {
          addr : item
        }

        addressArr.push(obj);
      })

      return addressArr;
  }

  buildRegisterFormPostData(registerFormInput: RegisterForm) {

    let { firstName,
      lastName,
      dateOfBirth,
      gender,
      userType,
      phoneNumber,
      email,
      password,
      address } = registerFormInput;

    let { year, month, day } = dateOfBirth;

    let { line1, line2, country, state, city, pincode } = address;

    let userAddress = {
      address_line_1 : line1,
      address_line_2 : line2,
      city,
      state,
      country, 
      pincode
    }

    return {
      firstName,
      lastName,
      dateOfBirth : `${year}${month}${day}`,
      address : userAddress,
      gender : parseInt(gender),
      role : parseInt(userType),
      phone : phoneNumber,
      email,
      password
    }
  }
}