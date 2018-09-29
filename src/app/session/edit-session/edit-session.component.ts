import { Component, OnInit } from '@angular/core';

import * as helper from "../../logic/helper";

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {
  defaultProject = `Share Innovation Sauce
  tags : content
  INPUT	3 Terms:CAD, cent:10, secs:60
  Jar, n:Jar3L, vol:3, content:0, available:3
  Jar, n:Jar5L, vol:5, content:0, available:5
  Jar, n:Jar8L, vol:8, content:8, available:0
                                  
  SOLUTIONS 1
  
  OUTPUT 1
  Jar	WITH content = 4`;

  defaultOperation = `Top Innovation Sauce
tags : content
INPUT 2 Terms:CAD, cent:1, secs:2
Jar	1	n:fromJar,	content>0				
Jar	2	n:toJar,	available>0				
                          
FUNCTIONS 1
poured=MIN(fromJar.content,toJar.available)
                          
OUTPUT 2
fromJar.content-=poured,available+=poured				
toJar.content+=poured,available-=poured`;

  // Problem Class structures:
  problemRows: string[] = [];
  problemTitle: string = '';
  problemTags: string = '';
  problemTerms: {currency: string, bid: number, timeframe: number};
  contextRows: string[] = [];
  solutionRows: string[] = []; 
  testRows: string[] = [];

  oddNumbers: number[] = [];

  // Operation Class structures:
  operationRows: string[] = [];
  operationTitle: string = '';
  operationTags: string = '';
  operationTerms: {currency: string, bid: number, timeframe: number};
  inputRows: string[] = [];
  functionRows: string[] = []; 
  outputRows: string[] = [];

  evenNumbers: number[] = [];

  constructor() { }

  ngOnInit() {
    // Initialize Problem structures from defaultProject
    this.problemRows = helper.lines(this.defaultProject);
    this.problemTitle = this.problemRows[0];

    // Initialize Operation structures from defaultOperation
    this.operationRows = helper.lines(this.defaultOperation);
    this.operationTitle = this.operationRows[0];

  }

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }

}
