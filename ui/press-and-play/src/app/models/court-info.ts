import { Slot } from "./slot";

export interface CourtInfo {
  id : string;
  name : string;
  address : any;
  phone: string;
  rating : number;
  availableSlots : Slot[];
  manager_id : string;
  image_url : string;
  mainLocation? : string;
  formattedAddress? : string;
}