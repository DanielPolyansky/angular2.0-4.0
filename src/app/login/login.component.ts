import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild ('f') signInForm: NgForm;
  signInFormReactive: FormGroup;
  token: String;
  errors = [];
  successfullLogin: Boolean = false;
  constructor(private auth: AuthService, private router: Router) {

   }
  proceed = ()=>{
    this.signInForm.resetForm();
    this.errors = [];
  }
   onLogin = (form: FormGroup) => {
     const user = {
       email: form.value.email,
       password: form.value.password
    };
     this.auth.signIn(user)
     .subscribe(
        (res)=>{
          if(typeof res.json().token !== 'undefined'){
            console.log(this.auth.isLogged())
            console.log(this.token);
            this.successfullLogin = true;
            console.log(res.json());
            localStorage.setItem('currentUser', res.json().token);
            this.token = localStorage.getItem('currentUser');
            this.router.navigateByUrl('/chat')
          } else {
            console.log(res.json());   
            this.errors.push(res.json().message);
            console.log(this.errors);
          }
        },
        (err)=>{console.log(err.json())}
     );
   }

  ngOnInit() {
    this.signInFormReactive = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
    });
  }

  /*onSubmit = (f:NgForm) => {
    console.log(f);
  }*/
}
