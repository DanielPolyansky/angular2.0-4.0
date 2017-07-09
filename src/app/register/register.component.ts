import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

 @ViewChild('f') signUpForm: NgForm;
  ngOnInit() {
  }

  /*onSubmit = (f:NgForm) => {
    console.log(f);
  }*/

  onSubmit = () => {
    console.log(this.signUpForm);
  }

}
