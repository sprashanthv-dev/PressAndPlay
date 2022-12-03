import { Injectable } from "@angular/core";
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
    name: "Lotee Football Stadium",
    distance: 16,
    availableSlots: 10,
    location: "Athens North, Boulder",
    pricePerHour: 20,
    rating: 4.5
  },
  {
    name: "Rush International Stadium",
    distance: 25,
    availableSlots: 15,
    location: "Pearl Street, Boulder",
    pricePerHour: 10,
    rating: 3.8
  }, 
  {
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

}