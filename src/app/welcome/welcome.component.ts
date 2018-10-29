import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as h from "../logic/helper";
import * as q from "../logic/AlgoQueue";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, AfterViewInit {

  timer: number;
  interval: number = 1000;   // set interval timer to 300ms

  tagsCounter: number;
  i: number = 0;
  nrInterests = 7;  // 7 Default interests :-)

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

  // vars for spinner
  // 7 Tags / Links
  link1: string = '';
  link2: string = '';
  link3: string = '';
  link4: string = '';
  link5: string = '';
  link6: string = '';
  link7: string = '';
  // Nr Projects for Tag / Link
  pT1: number = 0;
  pT2: number = 0;
  pT3: number = 0;
  pT4: number = 0;
  pT5: number = 0;
  pT6: number = 0;
  pT7: number = 0;
  // Nr Services for Tag / Link
  sT1: number = 0;
  sT2: number = 0;
  sT3: number = 0;
  sT4: number = 0;
  sT5: number = 0;
  sT6: number = 0;
  sT7: number = 0;

  nProject1: string = '';
  nProject2: string = '';
  nProject3: string = '';
  nProject4: string = '';
  nProject5: string = '';
  nProject6: string = '';
  nProject7: string = '';
  // Country Flag / Code for Project
  pF1: string = '';
  pF2: string = '';
  pF3: string = '';
  pF4: string = '';
  pF5: string = '';
  pF6: string = '';
  pF7: string = '';

  nService1: string = '';
  nService2: string = '';
  nService3: string = '';
  nService4: string = '';
  nService5: string = '';
  nService6: string = '';
  nService7: string = '';
  // Country Flag / Code for Service
  sF1: string = '';
  sF2: string = '';
  sF3: string = '';
  sF4: string = '';
  sF5: string = '';
  sF6: string = '';
  sF7: string = '';

  constructor() {

    // Translating gs code from function intlTeams() from WorldMarket.gs / W3AI spreadsheet / @W3AI.net 
    // 14 - Starting from line 14 - skipping the gs files initializations
    let nrLinks = q.queue.length;
    this.nrInterests = nrLinks;
    console.log('-- Queue Length: ' + nrLinks);

    // 15 - TODO - [ ] - add top header line to the matrix? including the nrProblems and Services
    let nrProblems = 134;
    let nrServices = 43;

    // 24 
    let spikes = 7;     // Nr rows in the market wheel in the W3AI sheet - here called spikes
    // 28
    let row0 = 0;       // to keep some similarity / compatibility with the gs code

    // TODO - [ ] - to review and change vars declarations below that are copied from the WorldMarket.gs file
    // 34 -  Define and load the tags array[][] / [tag, nr problems/tag, nr services/tag]
    let tag = new Array(nrLinks);
    let problems = new Array(nrLinks);
    let pFlags = new Array(nrLinks);   // Array with Country codes for Problems
    var services = new Array(nrLinks);
    var sFlags = new Array(nrLinks);   // Array with Country codes for Services

    // 41 - 3 is removed now - The 3 in Rows (3 + t) is the header offset - the tags/links start from line/row 3 - Jun 10, 2018       
    for (let t=0; t<nrLinks; t++) {
            
    tag[t] = new Array(3); // to write 3 values 
    tag[t][0] = q.queue[t][0]; // Read into tag[] the link value from Column 1 / A
    tag[t][1] = q.queue[t][2]; // Read into tag[] the nr problems/tag value from Column 3 / C
    tag[t][2] = q.queue[t][17]; // Read into tag[] the nr services/tag value from Column 18 / R

    // Jun 13 SI: I just added 7 columns for countries of the originator of each problem and service 
    problems[t] = new Array(tag[t][1]);
    pFlags[t] = new Array(tag[t][1]);
    for(let p=0; p<tag[t][1]; p++) {
      problems[t][p] = q.queue[t][10+p]; // demand.getRange(t, 11 + p).getValue(); // Problems Titles start in col 11 / K
      pFlags[t][p] = q.queue[t][3+p];   // demand.getRange(t, 4 + p).getValue(); // Problems' Flags start in col 4 / D
    }
    
    services[t] = new Array(tag[t][2]);
    sFlags[t] = new Array(tag[t][2]);
    for(let s=0; s<tag[t][2]; s++) {
      services[t][s] = q.queue[t][25+s]; // demand.getRange(t, 26 + s).getValue();  // Services start in col 26 / Z
      sFlags[t][s] = q.queue[t][18+s]; // demand.getRange(t, 19 + p).getValue(); // Problems' Flags start in col 19 / S
    }
  } // End loading the arrays for Tags, Problems, Services and Flags for Problems and services


    this.timer = setInterval( ()=> {

      // Write the loop's 7 tags
      this.link1 = tag[(this.i + 0) % nrLinks][0];
      this.link2 = tag[(this.i + 1) % nrLinks][0];
      this.link3 = tag[(this.i + 2) % nrLinks][0];
      this.link4 = tag[(this.i + 3) % nrLinks][0];
      this.link5 = tag[(this.i + 4) % nrLinks][0];
      this.link6 = tag[(this.i + 5) % nrLinks][0];
      this.link7 = tag[(this.i + 6) % nrLinks][0];
      // Write the nr of Projects with the tag
      this.pT1 = tag[(this.i + 0) % nrLinks][1];
      this.pT2 = tag[(this.i + 1) % nrLinks][1];
      this.pT3 = tag[(this.i + 2) % nrLinks][1];
      this.pT4 = tag[(this.i + 3) % nrLinks][1];
      this.pT5 = tag[(this.i + 4) % nrLinks][1];
      this.pT6 = tag[(this.i + 5) % nrLinks][1];
      this.pT7 = tag[(this.i + 6) % nrLinks][1];
      // Write the nr of Services with the tag
      this.sT1 = tag[(this.i + 0) % nrLinks][2];
      this.sT2 = tag[(this.i + 1) % nrLinks][2];
      this.sT3 = tag[(this.i + 2) % nrLinks][2];
      this.sT4 = tag[(this.i + 3) % nrLinks][2];
      this.sT5 = tag[(this.i + 4) % nrLinks][2];
      this.sT6 = tag[(this.i + 5) % nrLinks][2];
      this.sT7 = tag[(this.i + 6) % nrLinks][2];

      // Write the Titles of the Projects associated with the mid Tag / Link - nr 4
      this.nProject1 = problems[(this.i + 3) % nrLinks][0];
      this.nProject2 = problems[(this.i + 3) % nrLinks][1];
      this.nProject3 = problems[(this.i + 3) % nrLinks][2];
      this.nProject4 = problems[(this.i + 3) % nrLinks][3];
      this.nProject5 = problems[(this.i + 3) % nrLinks][4];
      this.nProject6 = problems[(this.i + 3) % nrLinks][5];
      this.nProject7 = problems[(this.i + 3) % nrLinks][6];
      // Show Country code for each Project associated to tag 3
      this.pF1 = pFlags[(this.i + 3) % nrLinks][0];
      this.pF2 = pFlags[(this.i + 3) % nrLinks][1];
      this.pF3 = pFlags[(this.i + 3) % nrLinks][2];
      this.pF4 = pFlags[(this.i + 3) % nrLinks][3];
      this.pF5 = pFlags[(this.i + 3) % nrLinks][4];
      this.pF6 = pFlags[(this.i + 3) % nrLinks][5];
      this.pF7 = pFlags[(this.i + 3) % nrLinks][6];

      // Write the Titles of the Services associated with the mid Tag / Link - nr 4
      this.nService1 = services[(this.i + 3) % nrLinks][0];
      this.nService2 = services[(this.i + 3) % nrLinks][1];
      this.nService3 = services[(this.i + 3) % nrLinks][2];
      this.nService4 = services[(this.i + 3) % nrLinks][3];
      this.nService5 = services[(this.i + 3) % nrLinks][4];
      this.nService6 = services[(this.i + 3) % nrLinks][5];
      this.nService7 = services[(this.i + 3) % nrLinks][6];
      // Show Country code for each Service associated to tag 3
      this.sF1 = sFlags[(this.i + 3) % nrLinks][0];
      this.sF2 = sFlags[(this.i + 3) % nrLinks][1];
      this.sF3 = sFlags[(this.i + 3) % nrLinks][2];
      this.sF4 = sFlags[(this.i + 3) % nrLinks][3];
      this.sF5 = sFlags[(this.i + 3) % nrLinks][4];
      this.sF6 = sFlags[(this.i + 3) % nrLinks][5];
      this.sF7 = sFlags[(this.i + 3) % nrLinks][6];

      // Move to next tag / link in the queue
      this.i++;

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

    }, this.interval );

  }

  getPrjFlag1() {
    let flagPath = 'url(/assets/flags/';
    if ( this.pF1 ) {
      // console.log('-- this.pF1: ' + this.pF1.toUpperCase());
      flagPath += this.pF1.toUpperCase() + '.png';
    }
    return flagPath;
  }
  getPrjFlag2() {
    let flagPath = 'url(/assets/flags/';
    if ( this.pF2 ) {
      flagPath += this.pF2.toUpperCase() + '.png';
    }
    return flagPath;
  }
  getPrjFlag3() {
    let flagPath = 'url(/assets/flags/';
    if ( this.pF3 ) {
      flagPath += this.pF3.toUpperCase() + '.png';
    }
    return flagPath;
  }
  getPrjFlag4() {
    let flagPath = 'url(/assets/flags/';
    if ( this.pF4 ) {
      flagPath += this.pF4.toUpperCase() + '.png';
    }
    return flagPath;
  }
  getPrjFlag5() {
    let flagPath = 'url(/assets/flags/';
    if ( this.pF5 ) {
      flagPath += this.pF5.toUpperCase() + '.png';
    }
    return flagPath;
  }
  getPrjFlag6() {
    let flagPath = 'url(/assets/flags/';
    if ( this.pF6 ) {
      flagPath += this.pF6.toUpperCase() + '.png';
    }
    return flagPath;
  }
  getPrjFlag7() {
    let flagPath = 'url(/assets/flags/';
    if ( this.pF7 ) {
      flagPath += this.pF7.toUpperCase() + '.png';
    }
    return flagPath;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  //   // testing writing in the loop table from the queue matric
  //   // h.setCell('loop', 3, 3, 'test loop');
  //   // h.setCell('loop', 4, 4, q.queue[3][0]);

  } // END of ngAfterViewInit

  // async delay(ms: number) {
  //   await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  // }

}
