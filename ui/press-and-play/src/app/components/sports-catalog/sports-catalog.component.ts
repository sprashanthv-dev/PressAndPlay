import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
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
  headerLocation: string;

  constructor(
    private utilService: UtilService,
    private dataService : DataService,
    private appStateService: AppStateService,
    private router : Router) { 
      this.headerLocation = "you! ";
    }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  sportsCatalogList : SportsCatalogItem[] = [];

  ngOnInit(): void {
    //TODO : Check if location is not empty before calling api
    this.fetchAllCatalogItems("Some Random Location");
    this.locationRef = this.appStateService.location.subscribe(
        val => 
        {
           let splits: string[] = this.utilService.splitString(val, ", ");
           this.headerLocation = splits[0];
        }
    )
    this.subscriptions.push(this.locationRef);
  }

  //TODO : Integrate get catalog items REST API
  fetchAllCatalogItems(location : string) {
    this.sportsCatalogList = this.dataService.getMockCatalogItems();
  }

  handleCatalogSelection(catalogId : any) {
    this.router.navigate(['', 'catalog', catalogId]);
  }

}
