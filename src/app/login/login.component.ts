import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFormReactive: FormGroup;
  token: String;
  successfullLogin: Boolean = false;
  constructor(private auth: AuthService) {

   }

   onLogin = (form: FormGroup) => {
     const user = {
       email: form.value.email,
       password: form.value.password
    };
     this.auth.signIn(user)
     .subscribe(
        (res)=>{
          localStorage.setItem('currentUser', res.json().token);
          this.token = localStorage.getItem('currentUser');
          console.log(this.token);
          console.log(this.successfullLogin);
          if(this.token!=undefined){
            this.successfullLogin = true;
          }
        },
        (err)=>{console.log(err)}
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
