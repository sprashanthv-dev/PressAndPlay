import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private modalRef : NgbActiveModal) { }

  ngOnInit(): void {
  }

  handleRegistration() {

  }

  closeModal() {
    this.modalRef.close();
  }
}