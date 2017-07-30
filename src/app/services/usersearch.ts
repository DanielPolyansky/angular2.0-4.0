import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription';
@Injectable()
export class UserSearch {
    mySubscription: Subscription;
    constructor(private http: Http){
    }
    
    userSearch(passedValue:String){
        return this.http.post('http://localhost:3000/usersearch',passedValue);
    }
}