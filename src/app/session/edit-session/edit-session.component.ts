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
  pRows: string[] = [];
  pTitle: string = '';
  pTags: string = '';
  pTerms: {currency: string, bid: number, timeframe: number};
  ctxtRows: string[] = [];        // contextRows
  ctxtEntitiesNo: number = 3; // 3 for testing eval, etc
  solRows: string[] = [];         // solutionRows
  testRows: string[] = [];        

  oddNumbers: number[] = [];

  // Operation Class structures:
  operationRows: string[] = [];
  operationTitle: string = '';
  operationTags: string = '';
  operationInputFunction: string = '';
  operationTerms: {currency: string, bid: number, timeframe: number};
  inputRows: string[] = [];
  functionRows: string[] = []; 
  outputRows: string[] = [];

  evenNumbers: number[] = [];

  solution: any = '';
  planFStart: string = `solution = function( `;  // the start string for JS planner function
  planFBody: string = '';
  planFEnd: string = `;`;
  result: string = 'console.log("Eval solution = ") + this.solution;'; 

  sum: any = 0;
  testSumString: string = 'this.sum += 10;';

  constructor() { }

  ngOnInit() {
    // Initialize Problem structures from defaultProject
    this.pRows = helper.lines(this.defaultProject);
    this.pTitle = this.pRows[0];

    // Initialize Operation structures from defaultOperation
    this.operationRows = helper.lines(this.defaultOperation);
    this.operationTitle = this.operationRows[0];

    console.log("Test eval Solver function from ngOnInit / edit-session");

    // Test eval Solver function - to be launched from Project Start / Stop button(s)

    let entitiesNo = this.ctxtEntitiesNo;   // should be 3 in eval

    this.operationInputFunction = 
    helper.nForHeader(2, '  ', 'i', 1, '<=', 'entitiesNo', '++') + 
    this.testSumString + 
    helper.nForFooter(2, '  ');

    console.log(this.operationInputFunction);

    this.solution = eval(this.operationInputFunction);

  }

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }

}
