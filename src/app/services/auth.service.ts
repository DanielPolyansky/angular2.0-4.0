import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
@Injectable()
export class AuthService {
    constructor(private http: Http){

    }
    isLogged = ()=>{
        if(localStorage.getItem('currentUser')!=undefined||localStorage.getItem('currentUser')!=null){
            return true;
        }
        else return false;
    };
    signIn(credentials){
        return this.http.post('http://localhost:3000/api/login',credentials);
    }
    signUp(credentials){
        return this.http.post('http://localhost:3000/api/authenticate',credentials);
    }
}