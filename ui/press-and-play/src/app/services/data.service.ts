import { Injectable } from "@angular/core";
import { CourtInfo } from "../models/court-info";
import { LocationInfo } from "../models/location-info";
import { RegisterForm } from "../models/register-form";
import { Slot } from "../models/slot";
import { SportsCatalogItem } from "../models/sports-catalog-item";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: "root"
})

//* All data related manipulations (formatter) will 
//* be handled by this service.
export class DataService {

  constructor(private utilSrv: UtilService) { }

  formatCatalogItem(catalogItem: SportsCatalogItem, characterLimit: number) {

    let formattedCatalogItem = { ...catalogItem };

    formattedCatalogItem.distance = Number(formattedCatalogItem.distance?.toFixed(2));
    formattedCatalogItem.rating = Number(formattedCatalogItem.rating?.toFixed(2));

    formattedCatalogItem.altName = this.utilSrv.trimStringLength(
      formattedCatalogItem.name, characterLimit);

    formattedCatalogItem.altLocation = this.utilSrv.trimStringLength(
      formattedCatalogItem.location, characterLimit);

    return formattedCatalogItem;
  }

  formatCourtInfoResponse(courtInfo : CourtInfo) {

    let formattedCourtInfo = { ...courtInfo };

    formattedCourtInfo['mainLocation'] = `${courtInfo.address.city},
      ${courtInfo.address.state},
      ${courtInfo.address.country}, 
      ${courtInfo.address.pincode}`;

    formattedCourtInfo['formattedAddress'] = `${courtInfo.address.address_line_1} ${courtInfo.address.address_line_2}`;
    
    let slots = formattedCourtInfo.availableSlots;

    slots.forEach((slot : Slot) => {
      
      let startTime = slot.time_start_hhmm;
      let endTime = slot.time_end_hhmm;
      
      let amOrPm = (endTime / 100 ) < 12 ? "AM" : "PM";

      slot.altTime_start = this.utilSrv.formatTime(startTime);
      slot.altTime_end = this.utilSrv.formatTime(endTime);      

      slot.timeOfTheDay = amOrPm;
      slot.selected = slot.booked ? true : false;
    })

    return formattedCourtInfo;
  }

  // parse results from /autocomplete api
  parseAutoCompleteResponse(value: any): any[] {
    let output = value;

    let properties = output.map((item: { properties: any; }) => item.properties);

    let addresses = properties.map((item: any) => {
      return {
        address: item.street + ", " + item.state + ", " + item.country,
        latitude: item.lat,
        longitude: item.lon
      }
    });

    let sscValues = addresses.map((item: any) => item.address);

    let uniqueAddr: Set<string> = new Set(sscValues);
    let result = Array.from(uniqueAddr.values());

    let finalAddresses: LocationInfo[] = [];

    result.forEach((location: string) => {

      let addressIndex = addresses.findIndex((item: any) => item.address === location);

      if (addressIndex !== -1) {

        let addressInfo = addresses[addressIndex];

        let { address, latitude, longitude } = addressInfo;

        finalAddresses.push({ address, latitude, longitude });
      }
    })

    return finalAddresses;
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
      address_line_1: line1,
      address_line_2: line2,
      city,
      state,
      country,
      pincode
    }

    return {
      firstName,
      lastName,
      dateOfBirth: `${year}${month}${day}`,
      address: userAddress,
      gender: parseInt(gender),
      role: parseInt(userType),
      phone: phoneNumber,
      email,
      password
    }
  }

  formatUserProfileResponse(profileResponse: any) {

    let { firstName, lastName, email } = profileResponse;

    return {
      Name: `${firstName} ${lastName}`,
      Email: email
    }
  }
}