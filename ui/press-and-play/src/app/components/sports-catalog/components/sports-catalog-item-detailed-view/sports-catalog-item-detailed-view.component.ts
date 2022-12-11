import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sports-catalog-item-detailed-view',
  templateUrl: './sports-catalog-item-detailed-view.component.html',
  styleUrls: ['./sports-catalog-item-detailed-view.component.css']
})
export class SportsCatalogItemDetailedViewComponent implements OnInit {

  rating: any;
  slots : any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.slots = [{
      time : "9:00 AM - 10:00 AM",
      selected : false
    },
    {
      time : "10:00 AM - 11:00 AM",
      selected : false
    },
    {
      time : "11:00 AM - 12:00 PM",
      selected : false
    },
    {
      time : "12:00 PM - 1:00 PM",
      selected : false
    }]
  }

  setRating(){
    console.log(this.rating)
    // call rating API
  }

  handleSlotSelection(slot : any) {
    
    this.slots.forEach(slot => slot.selected = false);
    console.log(slot);

    let index = this.slots.findIndex(item => item.time === slot.time);


    if (index !== -1) {
      this.slots[index] = { time : slot.time, selected : !slot.selected }; 
    }
  }
}
