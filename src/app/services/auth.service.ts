import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
@Injectable()
export class AuthService {
    constructor(private http: Http){

    }
    isLogged = ()=>{
    if(typeof localStorage.getItem('currentUser') === "undefined"){
            return false;
        } 
    else if(localStorage.getItem('currentUser')==null){
            return false;
        }
        else{
            return true;
        }
            
    };
    signIn(credentials){
        return this.http.post('http://localhost:3000/api/login',credentials);
    }
    signUp(credentials){
        return this.http.post('http://localhost:3000/api/authenticate',credentials);
    }
}