import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, tap, map, filter
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/services/data.service';
import { SearchLocation } from 'src/app/models/loc-search-model';

@Component({
  selector: 'app-loc-search',
  templateUrl: './loc-search.component.html',
  styleUrls: ['./loc-search.component.css']
})
export class LocSearchComponent implements OnInit {
  private search_results = new Subject<string>();
  results!: Observable<any>;
  finalAddresses: any[] = [] ;
  private current_location: SearchLocation;
  private default_value: string[];

  constructor(private http_service: HttpService, private dataService : DataService) { 
    this.current_location = {latitude: "", longitude: ""};
    this.default_value = [];
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

    this.setCurrentLocation();
  }

  search(term: string): void {
    this.search_results.next(term);
    console.log("search: " + term);
  }

  onFocus(term: string): Observable<any> {
    console.log("Focussed");
    console.log("current location: " + this.current_location);
    return this.http_service.makeGetApiCall('AUTOCOMPLETE_API',
      environment.geoapifyUrl,
      { "queryParams": { 'text': term, "apiKey": environment.apiKey, "limit": 10, "type": "street"} })
      .pipe(map((value) => value['features']),
        tap((val) => console.log(val)))
  }

  setCurrentLocation(): any {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      console.log("lat: " + latitude+" lon: "+longitude);
      this.current_location = {latitude: latitude.toString(), longitude: longitude.toString()}
    
      console.log(this.current_location);
      var response = this.http_service.makeGetApiCall('REVERSE_API', 
      environment.geoapifyUrl, 
      {"queryParams": {"lat": this.current_location.latitude, 
                       "lon": this.current_location.longitude, 
                      "apiKey": environment.apiKey}});
      response.subscribe(val => {
        this.default_value = this.dataService.parseAutoCompleteResponse(val['features']);
        console.log(this.default_value);
      });
    });
  }
}
