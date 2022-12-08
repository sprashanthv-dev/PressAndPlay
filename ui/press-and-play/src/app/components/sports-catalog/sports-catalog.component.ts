import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SportsCatalogItem } from 'src/app/models/sports-catalog-item';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sports-catalog',
  templateUrl: './sports-catalog.component.html',
  styleUrls: ['./sports-catalog.component.css']
})
export class SportsCatalogComponent implements OnInit {

  constructor(
    private dataService : DataService,
    private router : Router) { }

  sportsCatalogList : SportsCatalogItem[] = [];

  ngOnInit(): void {
    //TODO : Check if location is not empty before calling api
    this.fetchAllCatalogItems("Some Random Location");
  }

  //TODO : Integrate get catalog items REST API
  fetchAllCatalogItems(location : string) {
    this.sportsCatalogList = this.dataService.getMockCatalogItems();
  }

  handleCatalogSelection(catalogId : any) {
    this.router.navigate(['', 'catalog', catalogId]);
  }

}
