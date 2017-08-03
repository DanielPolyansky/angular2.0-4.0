import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/User.Interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

 @ViewChild('f') signUpForm: NgForm;
  ngOnInit() {
  }

  /*onSubmit = (f:NgForm) => {
    console.log(f);
  }*/
  successfulRegistered: Boolean = false;
  user: IUser = {
    email:null,
    username:null
  };
  errors = [];
  proceed = (success: Boolean) => {
    if(success){
      this.router.navigateByUrl('/login');
    }
    else {
      this.errors = [];
      this.signUpForm.resetForm();
    }
  }
  onAuthenticate = (form: NgForm) => {
    const newUser = {
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
      pass2: form.value.pass2
    }
    this.auth.signUp(newUser)
     .subscribe(
        (res)=>{
          console.log(res);
          if(res.json().success==true){
            this.successfulRegistered = true;
            this.user.email = newUser.email;
            this.user.username = newUser.username;
          }
          else {
              this.errors.push(res.json().message);
          }
        },
        (err)=>{console.log(err)}
     );
  }
    
    

}
