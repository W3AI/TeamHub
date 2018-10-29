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

    // this.timer = setInterval( ()=> {

    //   // Super Neural Net Teams
    //   this.superFriendsNo = this.superFriendsNo + Math.floor(Math.random() * Math.floor(4))
    //     - Math.floor(Math.random() * Math.floor(2));

    //   this.superProjectsNo = this.superProjectsNo + Math.floor(Math.random() * Math.floor(3))
    //     - Math.floor(Math.random() * Math.floor(2));

    //   this.superServicesNo = this.superServicesNo + Math.floor(Math.random() * Math.floor(5))
    //     - Math.floor(Math.random() * Math.floor(2));

    //   this.superTxPerMs = this.superTxPerMs + Math.floor(Math.random() * Math.floor(3))
    //     - Math.floor(Math.random() * Math.floor(2));

    //   this.superRatePerMin = this.superRatePerMin + (Math.floor(Math.random() * Math.floor(3))
    //     - Math.floor(Math.random() * Math.floor(2))) / 100;


    //   // Office Teams
    //   this.officeFriendsNo = this.officeFriendsNo + Math.floor(Math.random() * Math.floor(2))
    //     - Math.floor(Math.random() * Math.floor(2));

    //   this.officeProjectsNo = this.officeProjectsNo + Math.floor(Math.random() * Math.floor(2))
    //     - Math.floor(Math.random() * Math.floor(2));

    //   this.officeServicesNo = this.officeServicesNo + Math.floor(Math.random() * Math.floor(2))
    //     - Math.floor(Math.random() * Math.floor(2));

    //   this.officeTxPerMs = this.officeTxPerMs + Math.floor(Math.random() * Math.floor(2))
    //     - Math.floor(Math.random() * Math.floor(2));

    //   this.officeRatePerMin = this.officeRatePerMin + (Math.floor(Math.random() * Math.floor(2))
    //     - Math.floor(Math.random() * Math.floor(2))) / 100;

    // }, 500);

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // testing writing in the loop table from the queue matric
    // h.setCell('loop', 3, 3, 'test loop');
    // h.setCell('loop', 4, 4, q.queue[3][0]);

    // Translating gs code from function intlTeams() from WorldMarket.gs / W3AI spreadsheet / @W3AI.net 
    // 14 - Starting from line 14 - skipping the gs files initializations
    let nrLinks = q.queue.length;
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

  // 65 - Set show nrProblems and nrServices - this will have to be updated later from Firestore in realtime afteeach cycle?
  // TODO - [ ] - move into the interval loop once updated from Firestore
  h.setCell('loop', 2, 5, 'Market Browsing');   // to comment this !!!
  h.setCell('loop', 2, 2, nrProblems);          // initially 'nProjects'
  h.setCell('loop', 2, 8, nrServices);          // initially 'nGenes'

  // 69 - var urlFlags = "https://tcp1pnet.files.wordpress.com/2018/06/";
  let urlFlags = 'assets/flags/';

  // 71 - Now Start the Market Wheel
  // TODO - [ ] - To use some modulo nrLinks?
  let nrCycles = 10;  // TODO - [ ] - To change after fixing the speed
  let i = 1;
  // while (i <= nrLinks * nrCycles) {

  //     for (let s = 0; s < spikes; s++) {

  //       // Write the new wheel moved by one cell up
  //       h.setCell('loop', row0 + s, 3, '');  // market.getRange(row0 + s, 3).setValue(""); // Equivalent to eraseing the problem
  //       h.setCell('loop', row0 + s, 4, '');  // market.getRange(row0 + s, 4).setValue("");// TODO - Erase the Flag for problems

  //       h.setCell('loop', row0 + s, 9, '');  // market.getRange(row0 + s, 9).setValue(""); // Equivalent to eraseing the service
  //       h.setCell('loop', row0 + s, 8, '');  // market.getRange(row0 + s, 8).setValue(""); // TODO - Erase the Flag for services

  //       h.setCell('loop', row0 + s, 6, tag[(i - 1 + s) % nrLinks][0]);  // market.getRange(row0 + s, 6).setValue(tag[(i-1+s)%nrLinks][0]);  // Write the links / tags
  //       h.setCell('loop', row0 + s, 5, tag[(i - 1 + s) % nrLinks][1]);  // market.getRange(row0 + s, 5).setValue(tag[(i-1+s)%nrLinks][1]);  // Write Nr problems for the link tag
  //       h.setCell('loop', row0 + s, 7, tag[(i - 1 + s) % nrLinks][2]);  // market.getRange(row0 + s, 7).setValue(tag[(i-1+s)%nrLinks][2]);  // Write Nr services for the link tag

  //       // Write the Top 7 Problems associated with the Link in the middle (s+3) ; starting from col 3 / problems__001 ; i-1+3 to display the problems for the middle tag
  //       if (tag[(i - 1 + 3) % nrLinks][1] > 0) {
  //         for (let pn = 0; pn < tag[(i - 1 + 3) % nrLinks][1]; pn++) {
  //           h.setCell('loop', row0 + pn, 3, problems[(i - 1 + 3) % nrLinks][pn]);   // market.getRange(row0 + pn, 3).setValue(problems[(i-1+3)%nrLinks][pn]);  // Write the Problems associated with the link tag     

  //           // market.getRange(row0 + pn, 4).setFormula('=image("'+ urlFlags + pFlags[(i-1+3)%nrLinks][pn] + '.png")'); // display the flag
  //         }
  //       }

  //       // Write the Top 7 Services associated with the Link in the middle (s+3) ; starting from col 10 / services__001 ; i-1+3 to display the problems for the middle tag
  //       if (tag[(i - 1 + 3) % nrLinks][2] > 0) {
  //         for (let sn = 0; sn < tag[(i - 1 + 3) % nrLinks][2]; sn++) {
  //           h.setCell('loop', row0 + sn, 3, services[(i - 1 + 3) % nrLinks][sn]);   // market.getRange(row0 + sn, 9).setValue(services[(i-1+3)%nrLinks][sn]);  // display the services

  //           // market.getRange(row0 + sn, 8).setFormula('=image("'+ urlFlags + sFlags[(i-1+3)%nrLinks][sn] + '.png")'); // display the flag
  //         }
  //       }

  //     }

  //     h.setCell('loop', row0 + 7, 6, i); // market.getRange(row0 + 7, 6).setValue(i);  

  //     i++;

  //     // this.timer = setInterval(() => {
  //     //   // Just wait ms 100, etc
  //     //   i++;
  //     //   // TODO - [ ] - to change dynamically the interval time ms - to increase or decrease loop speed, stop, resume etc
  //     // }, 100);

  //     // this.delay(300).then(any=>{
  //     //   //your task after delay
  //     //   i++;
  //     // });

  //   } // END of while loop


  } // END of ngAfterViewInit

  // async delay(ms: number) {
  //   await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  // }

}
