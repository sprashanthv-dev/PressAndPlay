import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocSearchComponent } from './loc-search/loc-search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HeaderComponent } from './header.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    LocSearchComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgbDatepickerModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
