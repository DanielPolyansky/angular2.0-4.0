import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService) { }
  status = this.auth.isLogged();
  ngOnInit() {
    const checkStatus = Observable.interval(50);
    checkStatus.subscribe(()=>{
      this.status = this.auth.isLogged();
    }
    );
  }

}
