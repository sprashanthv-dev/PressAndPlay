import { Component, OnInit } from '@angular/core';
import { AppStateService } from './services/app-state.service';
import { StorageService } from './services/storage-service';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private storageSrv : StorageService,
    private utilSrv : UtilService,
    private appStateSrv : AppStateService) {}

  title = 'press-and-play';
  isUserLoggedIn : boolean = false;

  ngOnInit(): void {
    let userDetails = this.storageSrv.getValue('userDetails');

    let isAnyUserInfoNull = this.utilSrv.isAnyObjectValueNull(userDetails ? userDetails : {});

    if (!isAnyUserInfoNull) {
      this.appStateSrv.setUserLoginStatus(true);
    } else {
      this.appStateSrv.setUserLoginStatus(false);
    }
  }
}
