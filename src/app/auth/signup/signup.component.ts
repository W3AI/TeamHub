import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date(); // Today
    // Minimum age 10 years for now; Might be rised to local maturity age (18?)
    // TODO - Logic to have here the local minimum age for Maturity (18?) 
    // - to allow automatic patenting on user name
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 10); 
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
