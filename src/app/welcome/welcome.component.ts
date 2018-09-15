import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  timer: number;

  // TODO - Build Account Setup page to setup like these
  friendsNo = 532134;
  ratePerMin = 8.7;
  projectsNo = 1364;
  servicesNo = 2734;
  realtimeTx = 1567;

  realtime = false;

  constructor() {

    this.realtimeTx = Math.floor(this.realtimeTx / 10);

    this.ratePerMin = this.ratePerMin / 10;

    this.timer = setInterval( ()=> {

      this.friendsNo = this.friendsNo + Math.floor(Math.random() * Math.floor(2))
      - Math.floor(Math.random() * Math.floor(1));

      this.ratePerMin = this.ratePerMin + (Math.floor(Math.random() * Math.floor(2))
      - Math.floor(Math.random() * Math.floor(2))) / 100;

      this.projectsNo = this.projectsNo + Math.floor(Math.random() * Math.floor(2))
      - Math.floor(Math.random() * Math.floor(2));

      this.servicesNo = this.servicesNo + Math.floor(Math.random() * Math.floor(2))
    - Math.floor(Math.random() * Math.floor(2));

      this.realtimeTx = this.realtimeTx + Math.floor(Math.random() * Math.floor(2))
      - Math.floor(Math.random() * Math.floor(2));
    }, 300);

  }

  ngOnInit() {
  }

  onStartRealtime() {
    clearInterval(this.timer);

    this.realtimeTx = this.realtimeTx * 10;

    this.ratePerMin = this.ratePerMin * 10;

    this.timer = setInterval(()=> {

      this.friendsNo = this.friendsNo + Math.floor(Math.random() * Math.floor(2))
      - Math.floor(Math.random() * Math.floor(1));

      this.ratePerMin = this.ratePerMin + (Math.floor(Math.random() * Math.floor(10))
      - Math.floor(Math.random() * Math.floor(10))) / 100;

      this.projectsNo = this.projectsNo + Math.floor(Math.random() * Math.floor(2))
      - Math.floor(Math.random() * Math.floor(2));

      this.servicesNo = this.servicesNo + Math.floor(Math.random() * Math.floor(2))
    - Math.floor(Math.random() * Math.floor(2));

      this.realtimeTx = this.realtimeTx + Math.floor(Math.random() * Math.floor(5))
      - Math.floor(Math.random() * Math.floor(5));
    }, 100);

  }

  onStopRealtime() {
    clearInterval(this.timer);

    this.realtimeTx = Math.floor(this.realtimeTx / 10);

    this.ratePerMin = this.ratePerMin / 10;

    this.timer = setInterval( ()=> {

      this.friendsNo = this.friendsNo + Math.floor(Math.random() * Math.floor(2))
      - Math.floor(Math.random() * Math.floor(1));

      this.ratePerMin = this.ratePerMin + (Math.floor(Math.random() * Math.floor(2))
      - Math.floor(Math.random() * Math.floor(2))) / 100;

      this.projectsNo = this.projectsNo + Math.floor(Math.random() * Math.floor(2))
      - Math.floor(Math.random() * Math.floor(2));

      this.servicesNo = this.servicesNo + Math.floor(Math.random() * Math.floor(2))
    - Math.floor(Math.random() * Math.floor(2));

      this.realtimeTx = this.realtimeTx + Math.floor(Math.random() * Math.floor(2))
      - Math.floor(Math.random() * Math.floor(2));
    }, 300);
  }

}
