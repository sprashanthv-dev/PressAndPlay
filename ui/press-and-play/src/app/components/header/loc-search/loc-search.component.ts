import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, tap, map, filter
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loc-search',
  templateUrl: './loc-search.component.html',
  styleUrls: ['./loc-search.component.css']
})
export class LocSearchComponent implements OnInit {

  private search_results = new Subject<string>();
  results!: Observable<any>;

  output : any;
  finalAddresses: string[] = [] ;

  private current_location: string[];
  constructor(private http_service: HttpService) { this.current_location = [];}

  ngOnInit() {

    this.results = this.search_results.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => term.length == 0 ? [] : this.onFocus(term))
    );

    // this.results.pipe(
    //   map((val) => val['properties']),
    //   tap((val) => console.log(val))
    // );

    this.results.subscribe(val => {
      this.output = val;


      let addresses = this.output.map((item: { properties: any; }) => item.properties);
      let sscValues = addresses.map((item: { street: string; state: string; country: string; }) => item.street + ", " + item.state + ", " + item.country);
      let uniqueAddr : Set<string> = new Set(sscValues);
      let finalAddr : string[] = Array.from(uniqueAddr.values())

      this.finalAddresses = finalAddr;

      
    })


    /**
     * let addresses = temp2.map(item => item.properties);
     * let sscValues = addresses.map(item => item.street + ", " + item.state + ", " + item.country);
     * let uniqueAddr = new Set(sscValues)
     * let finalAddr = Array.from(uniqueAddr.values())
     */


    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      console.log("lat: " + latitude+" lon: "+longitude);
      this.current_location = [latitude.toString(), longitude.toString()];
    });
  }

  search(term: string): void {
    this.search_results.next(term);
    console.log("search: " + term);
  }

  onFocus(term: string): Observable<any> {
    console.log("Focussed");
    console.log("current location: "+this.current_location);
    return this.http_service.makeGetApiCall('AUTOCOMPLETE_API',
      'https://api.geoapify.com/v1/geocode/',
      { "queryParams": { 'text': term, "apiKey": environment.apiKey, "limit": 10, "type": "street"} })
      .pipe(map((value) => value['features']),
        tap((val) => console.log(val)))
  }
}
