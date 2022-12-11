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
import { UtilService } from 'src/app/services/util.service';
import { LocationInfo } from 'src/app/models/location-info';

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
    private appStateService: AppStateService,
    private utilService : UtilService) {
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

    return this.httpService.makeGetApiCall('AUTOCOMPLETE_API',
      environment.geoapifyUrl,
      { "queryParams": { 'text': term, "apiKey": environment.apiKey, "limit": 10, "type": "street" } })
      .pipe(map((value) => value['features']),
        tap((val) => console.log(val)))
  }

  setCurrentLocation(): any {
    navigator.geolocation.getCurrentPosition(position => {

      const { latitude, longitude } = position.coords;
      this.current_location = { latitude: latitude.toString(), longitude: longitude.toString() }

      let response = this.httpService.makeGetApiCall('REVERSE_API',
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
        console.log(this.finalAddresses);
        this.searchForm.setValue({currentAddress : this.finalAddresses[0].address});
        this.handleLocationSelection();
      });
    });
  }

  handleCurrentLocation() {
    this.setCurrentLocation();
  }

  handleLocationSelection(addressInfo? : any) {

    let locationInfo : LocationInfo = {
      address: '',
      latitude: '',
      longitude: ''
    };

    if (!this.utilService.isAnyObjectValueNull(addressInfo)) {

      let { address, latitude, longitude } = addressInfo;

      locationInfo.address = address;
      locationInfo.latitude = latitude;
      locationInfo.longitude = longitude;
    } else {

      locationInfo.address = this.searchForm.get('currentAddress')?.value;
      locationInfo.latitude = this.current_location.latitude;
      locationInfo.longitude = this.current_location.longitude;
    }

    this.appStateService.setLocation(locationInfo);
  }
}
