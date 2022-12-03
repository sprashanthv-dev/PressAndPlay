import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocSearchComponent } from './loc-search/loc-search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    LocSearchComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    LocSearchComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class HeaderModule { }
