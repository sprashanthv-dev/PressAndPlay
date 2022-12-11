import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { LocationInfo } from 'src/app/models/location-info';
import { SportsCatalogItem } from 'src/app/models/sports-catalog-item';
import { AppStateService } from 'src/app/services/app-state.service';
import { DataService } from 'src/app/services/data.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-sports-catalog',
  templateUrl: './sports-catalog.component.html',
  styleUrls: ['./sports-catalog.component.css']
})
export class SportsCatalogComponent implements OnInit, OnDestroy {

  subscriptions:Subscription[] = []
  locationRef: any;

  headerTitle = PRESS_AND_PLAY_CONSTANTS.CATALOG_LIST_HEADER;
  headerLocation: string = this.headerTitle.DEFAULT;

  latitude : string | null = null;
  longitude : string | null = null;

  constructor(
    private utilService: UtilService,
    private dataService : DataService,
    private appStateService: AppStateService,
    private router : Router) {    }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  sportsCatalogList : SportsCatalogItem[] = [];

  ngOnInit(): void {

    //TODO : Check if location is not empty before calling api
    this.fetchAllCatalogItems("Some Random Location");

    this.locationRef = this.appStateService.location
      .subscribe((location: LocationInfo) => {

        let { address, latitude, longitude } = location;

        this.headerLocation = `${this.headerTitle.LOCATION}${address}` ;
        this.latitude = latitude;
        this.longitude = longitude;
      })

    this.subscriptions.push(this.locationRef);
  }

  //TODO : Integrate get catalog items REST API
  fetchAllCatalogItems(location : string) {
    console.log(this.latitude);
    console.log(this.longitude);
    this.sportsCatalogList = this.dataService.getMockCatalogItems();
  }

  handleCatalogSelection(catalogId : any) {
    this.router.navigate(['', 'catalog', catalogId]);
  }

}
