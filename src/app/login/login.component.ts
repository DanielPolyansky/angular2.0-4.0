import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFormReactive: FormGroup;
  constructor(private auth: AuthService) {

   }

   onLogin = () => {
     this.auth.signIn(this.signInFormReactive.controls.email.value, this.signInFormReactive.controls.password.value)
     .subscribe(
       (response) => {console.log(response),
       (err) => {console.log(err)} 
      }
     )
   };

  ngOnInit() {
    this.signInFormReactive = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.min(5), Validators.max(15)])
    });
  }

  /*onSubmit = (f:NgForm) => {
    console.log(f);
  }*/
  onSubmit = () => {
    console.log(this.signInFormReactive);
    this.onLogin();
  }
}
