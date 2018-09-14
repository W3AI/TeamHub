import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // TODO - Build Account Setup page to setup like these
  friendsNo = 532134;
  projectsNo = 1364;
  servicesNo = 2734;
  realtimeTx = 1567;
  realtime = false;

  constructor() {
  }

  ngOnInit() {
  }

  onStartRealtime() {
    this.realtime = true;

    this.realtimeTx = 100;

    // while(this.realtime) {
    //   setTimeout(() => {
    //     this.realtimeTx = this.realtimeTx + Math.floor(Math.random() * Math.floor(10));
    //   }, Math.floor(Math.random() * Math.floor(1000)));
    // }
  }

  onStopRealtime() {
    this.realtime = false;

    this.realtimeTx = 200;
  }

}
