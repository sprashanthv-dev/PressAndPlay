import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SportsCatalogModule } from './components/sports-catalog/sports-catalog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './components/header/header.module';
import { RegisterComponent } from './components/header/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    SportsCatalogModule,
    HeaderModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: false,
      closeButton : true,
      progressAnimation: 'increasing'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    RegisterComponent
  ]
})
export class AppModule { }
