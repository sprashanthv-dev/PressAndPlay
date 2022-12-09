import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, tap, map, filter
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/services/data.service';
import { SearchLocation } from 'src/app/models/loc-search-model';
import { FormControl, FormGroup } from '@angular/forms';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-loc-search',
  templateUrl: './loc-search.component.html',
  styleUrls: ['./loc-search.component.css']
})
export class LocSearchComponent implements OnInit {

  search_results = new Subject<string>();

  searchForm = new FormGroup({
    currentAddress : new FormControl()
  })

  results!: Observable<any>;
  finalAddresses: any[] = [];
  current_location: SearchLocation;

  constructor(
    private httpService: HttpService,
    private dataService: DataService,
    private appStateService: AppStateService) {
    this.current_location = { latitude: "", longitude: "" };
  }

  ngOnInit() {
    this.results = this.search_results.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => term.length == 0 ? [] : this.onFocus(term))
    );

    this.results.subscribe(val => {
      this.finalAddresses = this.dataService.parseAutoCompleteResponse(val);
    })
  }

  search(): void {

    let searchTerm = this.searchForm.get('currentAddress')?.value;
    console.log("Search term: " + searchTerm); 

    this.search_results.next(searchTerm);
  }

  onFocus(term: string): Observable<any> {
    console.log("Focussed");
    console.log("current location: " + this.current_location);
    return this.httpService.makeGetApiCall('AUTOCOMPLETE_API',
      environment.geoapifyUrl,
      { "queryParams": { 'text': term, "apiKey": environment.apiKey, "limit": 10, "type": "street" } })
      .pipe(map((value) => value['features']),
        tap((val) => console.log(val)))
  }

  setCurrentLocation(): any {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      console.log("lat: " + latitude + " lon: " + longitude);
      this.current_location = { latitude: latitude.toString(), longitude: longitude.toString() }

      console.log(this.current_location);
      var response = this.httpService.makeGetApiCall('REVERSE_API',
        environment.geoapifyUrl,
        {
          "queryParams": {
            "lat": this.current_location.latitude,
            "lon": this.current_location.longitude,
            "apiKey": environment.apiKey
          }
        });
      response.subscribe(val => {
        this.finalAddresses = this.dataService.parseAutoCompleteResponse(val['features']);
        this.searchForm.setValue({currentAddress : this.finalAddresses[0].addr});
        this.handleLocationSelection();
      });
    });
  }

  handleCurrentLocation() {
    this.setCurrentLocation();
  }

  handleLocationSelection() {
    console.log("Inside location selected");
    console.log(this.searchForm.get('currentAddress')?.value);
    let searchTerm = this.searchForm.get('currentAddress')?.value;
    this.appStateService.location.next(searchTerm);
  }
}
