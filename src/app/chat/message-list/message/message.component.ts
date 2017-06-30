import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message: Message = new Message('some text', 'custom username', new Date("2017-06-15"), true);
  constructor() { }

  ngOnInit() {
  }

}
