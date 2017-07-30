import { Component, OnInit } from '@angular/core';
import { UserSearch } from '../../services/usersearch';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-usersearch',
  templateUrl: './usersearch.component.html',
  styleUrls: ['./usersearch.component.css'],
  providers: [UserSearch]

})
export class UsersearchComponent implements OnInit {

  constructor(private usersearch: UserSearch) { }
  mySubscription: Subscription;
  userFounded:[String];
  ngOnInit() {
    const usersearchObs = Observable.interval(1);
    //розібратись ще як працює і переробити по людськи
    this.mySubscription = usersearchObs.subscribe(()=>{
    });
  }

}
