import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private modal : NgbModal) {}

  ngOnInit(): void {

  }

  handleLogin() {
    this.modal.open(LoginComponent, {size: 'md'});
  }

  handleSignUp() {
    this.modal.open(RegisterComponent, { size : 'lg' });
  }

}
