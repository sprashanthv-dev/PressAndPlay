export interface Slot {
  slot_id : string | null;
  time_start_hhmm : number;
  altTime_start? : string;
  time_end_hhmm : number;
  altTime_end? : string;
  status : number;
  selected? : boolean;
  timeOfTheDay ?: string;
  booked? : boolean;
}