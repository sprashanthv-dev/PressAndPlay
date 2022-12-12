import { Address } from "../models/address";
import { Slot } from "./slot";

export interface AddCourt {
  name : string;
  address : Address;
  location : string;
  phone : string;
  availableSlots : Slot[];
  sportType : string;
}