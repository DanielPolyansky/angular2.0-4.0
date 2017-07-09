import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFormReactive: FormGroup;
  constructor() { }

  ngOnInit() {
    this.signInFormReactive = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.min(8), Validators.max(15)])
    });
  }

  /*onSubmit = (f:NgForm) => {
    console.log(f);
  }*/
  onSubmit = () => {
    console.log(this.signInFormReactive);
  }
}
