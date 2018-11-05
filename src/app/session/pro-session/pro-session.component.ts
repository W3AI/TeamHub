import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pro-session',
  templateUrl: './pro-session.component.html',
  styleUrls: ['./pro-session.component.css']
})
export class ProSessionComponent implements OnInit {
  defaultProject = `Resume Generator
  tags : relevant, projects, skills, keywords
  INPUT	3 Terms:CAD, dollar:10, secs:60
  Project, title : Free AI HRM, budget : $20M, timeframe : 5Y, skills : AI, GS, JS
  Project, title : Progressive AI OS, budget : $1.5M, timeframe : 1.5Y, skills: TS, Angular, Firestore, IndexedDb
  Project, title : AI Service Market, budget : $5M, timeframe : 3Y, skills : AI, blockchain, smart markets, realtime databases
                                  
  SOLUTIONS 3
  
  OUTPUT 1
  Resume	WITH content > 4 pages`;

  defaultOperation = `Career Projects
tags : report, ranked, projects, tags
INPUT 
List of keywords
Projects from personal Free PMO of W3AI.NET			
                          
FUNCTIONS 2
extract relevant project by keywords
rank projects by skills 
format reports
                          
OUTPUT n
Catalog of Career Projects reports`;

  // TODO - [ ] Change oddNumbers[] to Problem Class structures:
  // ContextsScripts[]
  // SolutionScripts[] 
  // TestScripts[]
  oddNumbers: number[] = [];

  // TODO - [ ] Change evenNumbers[] to Operation Class structures:
  // InputScripts[]
  // OperationScripts[] 
  // OutputScripts[]
  evenNumbers: number[] = [];

  constructor() { }

  ngOnInit() {
  }

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }

}
