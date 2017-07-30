import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService, private router: Router) { }
  mySubscription: Subscription;
  ngOnInit() {
    const checkStatus = Observable.interval(1);
    this.mySubscription = checkStatus.subscribe(()=>{
      if(this.auth.isLogged()==true){
        this.router.navigateByUrl('/chat');
      }
    });
  }
  ngOnDestroy(){
    this.mySubscription.unsubscribe();
  }
}
