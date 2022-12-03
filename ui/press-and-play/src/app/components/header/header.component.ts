import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, tap, map, filter
} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private search_results = new Subject<string>();
  results!: Observable<any>;
  private current_location: string[];
  constructor(private http_service: HttpService) { this.current_location = [];}

  ngOnInit() {
    this.results = this.search_results.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => term.length < 2 ? [] : this.onFocus(term))
    );

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      console.log("lat: "+latitude+" lon: "+longitude);
      this.current_location = [latitude.toString(), longitude.toString()];
    });
  }

  search(term: string): void {
    this.search_results.next(term);
    console.log(term);
  }

  onFocus(term: string): Observable<any> {
    console.log("Focussed");
    console.log("current location: "+this.current_location);
    return this.http_service.makeGetApiCall('AUTOCOMPLETE_API',
      'https://api.geoapify.com/v1/geocode/',
      { "queryParams": { 'text': term, "apiKey": "12ca4794bebe428b8aa32a47864ba8d3", "limit": 10, "type": "street"} })
      .pipe(map((value) => value['features']),
        tap((val) => console.log(val)))
  }
}
