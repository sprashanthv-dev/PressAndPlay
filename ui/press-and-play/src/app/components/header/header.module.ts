import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocSearchComponent } from './loc-search/loc-search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { HeaderComponent } from './header.component';
import { NgbCollapseModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HeaderComponent,
    LocSearchComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgbCollapseModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPopoverModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
