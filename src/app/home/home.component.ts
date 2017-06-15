import { Component, OnInit } from '@angular/core';

@Component({
 // selector: '[app-home]',
 // selector: '.app-home', ТЕЖ ПРАЦЮЄ, як атрибут і як клас
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  componentName: String = "Home";

  constructor() { }

  ngOnInit() {
  }

}
