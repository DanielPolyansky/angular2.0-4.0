import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
@Injectable()
export class AuthService {
    constructor(private http: Http){

    }
    signIn(credentials){
        return this.http.post('http://localhost:3000/api/login',credentials);
    }
    signUp(credentials){
        return this.http.post('http://localhost:3000/api/authenticate',credentials);
    }
}