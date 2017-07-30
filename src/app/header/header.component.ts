import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService) { }
  mySubscription: Subscription;
  status:Boolean;
  ngOnInit() {
    const checkStatus = Observable.interval(1);
    //розібратись ще як працює і переробити по людськи
    this.mySubscription = checkStatus.subscribe(()=>{
      this.status = this.auth.isLogged();
    });
  }
  ngOnDestroy(){
    this.mySubscription.unsubscribe();
  }
}
