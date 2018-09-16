import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  timer: number;

  // TODO - Build Account Setup page to setup like these

  superFriendsNo = 532134;
  superProjectsNo = 2344;
  superServicesNo = 3701;
  superTxPerMs = 1628;
  superRatePerMin = 9.07;

  officeFriendsNo = 5369;
  officeProjectsNo = 364;
  officeServicesNo = 734;
  officeTxPerMs = 156;
  officeRatePerMin = 0.89;

  realtime = false;

  constructor() {

    this.timer = setInterval( ()=> {

      // Super Neural Net Teams
      this.superFriendsNo = this.superFriendsNo + Math.floor(Math.random() * Math.floor(4))
        - Math.floor(Math.random() * Math.floor(2));

      this.superProjectsNo = this.superProjectsNo + Math.floor(Math.random() * Math.floor(3))
        - Math.floor(Math.random() * Math.floor(2));

      this.superServicesNo = this.superServicesNo + Math.floor(Math.random() * Math.floor(5))
        - Math.floor(Math.random() * Math.floor(2));

      this.superTxPerMs = this.superTxPerMs + Math.floor(Math.random() * Math.floor(3))
        - Math.floor(Math.random() * Math.floor(2));

      this.superRatePerMin = this.superRatePerMin + (Math.floor(Math.random() * Math.floor(3))
        - Math.floor(Math.random() * Math.floor(2))) / 100;


      // Office Teams
      this.officeFriendsNo = this.officeFriendsNo + Math.floor(Math.random() * Math.floor(2))
        - Math.floor(Math.random() * Math.floor(2));

      this.officeProjectsNo = this.officeProjectsNo + Math.floor(Math.random() * Math.floor(2))
        - Math.floor(Math.random() * Math.floor(2));

      this.officeServicesNo = this.officeServicesNo + Math.floor(Math.random() * Math.floor(2))
        - Math.floor(Math.random() * Math.floor(2));

      this.officeTxPerMs = this.officeTxPerMs + Math.floor(Math.random() * Math.floor(2))
        - Math.floor(Math.random() * Math.floor(2));

      this.officeRatePerMin = this.officeRatePerMin + (Math.floor(Math.random() * Math.floor(2))
        - Math.floor(Math.random() * Math.floor(2))) / 100;

    }, 500);

  }

  ngOnInit() {
  }

}
