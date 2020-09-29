import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.page.html',
  styleUrls: ['./sent.page.scss'],
})
export class SentPage implements OnInit {

  public message: any = [];

  constructor() {
    this.getMessage();
  }

  ngOnInit() {
  }

  getMessage(){
    // get the selected mail thread 
    this.messages = JSON.parse(localStorage.getItem("message"));
  }

}
