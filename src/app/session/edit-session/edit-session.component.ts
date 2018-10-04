import { Component, OnInit } from '@angular/core';

import * as dna from "../../logic/DNA";
import * as h from "../../logic/helper";

// l = new line - used in formatting
const l = '\n';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {
  defaultProject = `Title	Share Innovation Juice																
Description	Find a way to share 4 Liters of Innovation Sauce with a friend when you have 3 recipients of 3, 5 and 8 liters and 8 liters of Innovation Sauce in the largest recipient.																
Tags	content, available																
INPUT	1	3															
	Jar	,	name	:	Jar3L	,	volume	:	3	,	content	:	0	,	available	:	3
	Jar	,	name	:	Jar5L	,	volume	:	5	,	content	:	0	,	available	:	5
	Jar	,	name	:	Jar8L	,	volume	:	8	,	content	:	8	,	available	:	0
																	
nBots	?	1															
																	
OUTPUT	1																
	Jar	,	name	:	ANY	,	content	 = 	4								
																	
T&C			Terms	:	CAD	,	cent	:	10	,	seconds	:	60				
	Jar	,	name	:	dict	,	volume	:	5	,	content	:	0	,	available	:	5`;

  defaultOperation = `Top Innovation Sauce
description : top recipient
tags : content, available
INPUT 2 
Jar	1	name : fromJar , content > 0				
Jar	2	name : toJar ,	available > 0				
                          
FUNCTIONS 1
nr  name : top = MIN ( fromJar . content , toJar . available )
                          
OUTPUT 2
name : fromJar . content -= top , available += top				
name: toJar . content += top , available -= top

T&C : CAD , cent = 1 , secs = 2`;

  // Problem Class structures:
  // m is the memory of contexts and entities - initialized with context id = 0 ;
  m: any[][];                     // the memory array m - as in the dnas.js
  c: any[][]; 
  prRows: any[] = [];
  prDefLines: number = 0;
  prDefCounter: number = 0;
  prTitle: string = '';
  prDescription: string = '';
  prTags: string = '';
  prCtxtEntitiesNo: number = 1;   // at least 1 entity definition is needed, etc
  prCtxtRows: string[] = [];      // contextRows
  prEntArray: any[][];         // the entity array to be formatted and added to m - memory Array initiated above
  prSolNo: any = 1;               // usually at least 1 solution is needed
  prSolRows: string[] = [];       // solutionRows
  prSolArray: any[][];         // Here are the plan/path = Sequence of task lines
  prTestNo: any = 1;              // at least 1 test is needed in defining a problem/project
  prTestRows: string[] = [];
  prTestArray: any[][];
  prTerms: {currency: string, bid: number, timeframe: number};
  prFormatted: string = '';     

  oddNumbers: number[] = [];

  // Operation Class structures:
  opRows: any[] = [];
  opTitle: string = '';
  opDescription: string = '';
  opTags: string = '';
  opInputEntitiesNo: number = 0;
  opInputRows: any[] = [];
  opFunctionRows: any[] = []; 
  opOutputRows: any[] = [];
  opTerms: {currency: string, ask: number, timeframe: number};
  opFormatted: string = '';

  evenNumbers: number[] = [];

  opInputFunction: string = '';
  solution: any = '';
  planFStart: string = `solution = function( `;  // the start string for JS planner function
  planFBody: string = '';
  planFEnd: string = `;`;
  result: string = 'console.log("Eval solution = ") + this.solution;'; 

  sum: any = 0;
  testSumString: string = 'this.sum += 10;';

  constructor() {
  this.m = [];
  this.c = [["id",	0, "type", "Ctxt", "entities", 0,"step",   0,  "branch",   0, "status",     "ToDo", "path",""]];
  this.prEntArray = [];
  this.prSolArray = [];
  this.prTestArray = [];
}

  ngOnInit() {
    // Initialize Problem structures from defaultProject
    this.prRows = h.lines(this.defaultProject);
    this.prDefLines = this.prRows.length;
    console.log("Project definition lines:" + this.prDefLines);
    this.prTitle = h.tokens(h.pipes(this.prRows[0]))[1];
    this.prDescription = h.tokens(h.pipes(this.prRows[1]))[1];
    this.prTags = h.tokens(h.pipes(this.prRows[2]))[1];
    this.prCtxtEntitiesNo = Number(h.tokens(h.pipes(this.prRows[3]))[2]);
    this.c[0][5] = this.prCtxtEntitiesNo;
    this.prDefCounter = 4; // nr of lines until/including INPUT line 
    // Format Entity rows
    this.prEntArray = this.formatRows(this.prRows, 'type', this.prDefCounter, this.prCtxtEntitiesNo, this.prCtxtRows, this.prEntArray); 
    this.c = this.c.concat(this.prEntArray);
    this.prDefCounter += this.prCtxtEntitiesNo + 1;
    console.log("prDefCounter:" + this.prDefCounter);
    this.prSolNo = h.tokens(h.pipes(this.prRows[this.prDefCounter]))[2];
    // TODO - [ ] - To Format prSolRows if Any
    this.prDefCounter += 2;
    this.prTestNo = h.tokens(h.pipes(this.prRows[this.prDefCounter]))[1];
    this.prDefCounter += 1;
    // Format prTestRows
    this.prTestArray = this.formatRows(this.prRows, 'test', this.prDefCounter, this.prTestNo, this.prTestRows, this.prTestArray);
    
    console.log('-- After problemIni:');
    console.log('Problem - prEntArray:');
    console.log(this.prEntArray);
    console.log('Problem - Context:');
    console.log(this.c);
    console.log('Problem - prSolArray:');
    console.log(this.prSolArray);
    console.log('Problem - prTestArray:');
    console.log(this.prTestArray);
    this.m = this.c;
    console.log('Memory - m initialized:');
    console.log(this.m);

    this.prFormatted = 
    'Title: ' + this.prTitle + l +
    'Description: '+ this.prDescription + l + 
    'Tags: '+ this.prTags + l +
    l +
    'INPUT ' + this.prCtxtEntitiesNo + l +
    this.prCtxtRows +
    l +
    'SOLUTIONS Min: ' + this.prSolNo + l +
    l + 
    'OUTPUT Tests: ' + this.prTestNo + l +
    this.prTestRows;


    // Initialize Operation structures from defaultOperation
    this.opRows = h.lines(this.defaultOperation);
    this.opTitle = this.opRows[0];
    this.opDescription = this.opRows[1];
    this.opTags = this.opRows[2];

    this.opFormatted = this.opTitle + l + this.opDescription + l + this.opTags;

    // Test eval Solver function - to be launched from Project Start / Stop button(s)
    let entitiesNo = this.prCtxtEntitiesNo;   // should be 3 in eval
    this.opInputFunction = 
    dna.nForHeader(2, '  ', 'i', 1, '<=', 'entitiesNo', '++') + 
    this.testSumString + 
    dna.nForFooter(2, '  ');
    console.log(this.opInputFunction);
    this.solution = eval(this.opInputFunction);
    // End Test eval
  }

    // Function formatRows to be used for formatting 
    // & printing lists of entities, plans/sol, tests, 
    // & queries, funnctions, updaters - Input: 
    // rows: any[] = prRows/opRows; type: string = "type|test|query|solution|function";
    // start: nr; count: nr; 
    // lines: string[] = prCtxtRows/prTestRows/op..; array: any[] = prEntArray/prTestArray/op.. 
    formatRows(eRows: any[], type: string, 
      startRow: number, counter: number, 
      eLines: string[], eArray: any[][]) {
      for (let e = 0; e < counter; e++) {
        let row = '';
        let rowA = [];
        row = h.pipes(eRows[startRow + e]);
        row = row.replace(/[|:|]+/g, '|');
        row = row.replace(/[|,|]+/g, '|');
        row = row.replace('|', '');
        eLines.push(row + l);
        rowA = h.tokens(row);
        rowA.splice(0, 0, 'id', e + 1, type);
        // console.log(rowA);
        eArray[e] = rowA;
      }
      console.log(eArray.length);
      return eArray;
    }

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }

}
