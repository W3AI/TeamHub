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
                                          
  SOLUTIONS	?	1																		
                                          
  OUTPUT		1																		
    Jar				WITH		content	 = 	4											
                                          
  T&C			Terms	:	CAD	,	cent	 = 	10	,	Seconds	 = 	60							`;

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
  m: any[] = ["id",	0, "type", "Ctxt", "entities", 3,"step",   0,  "branch",   0, "status",     "ToDo", "path",""];
  prRows: any[] = [];
  prDefLines: number = 0;
  prDefCounter: number = 0;
  prTitle: string = '';
  prDescription: string = '';
  prTags: string = '';
  prCtxtEntitiesNo: number = 1;   // at least 1 entity definition is needed, etc
  prCtxtRows: any[] = [];         // contextRows
  prSolNo: any = 1;               // usually at least 1 solution is needed
  prSolRows: any[] = [];          // solutionRows
  prTestNo: any = 1;              // at least 1 test is needed in defining a problem/project
  prTestRows: any[] = [];
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

  constructor() { }

  ngOnInit() {
    // Initialize Problem structures from defaultProject
    this.prRows = h.lines(this.defaultProject);
    this.prDefLines = this.prRows.length;
    console.log("Project definition lines:" + this.prDefLines);
    this.prTitle = h.tokens(h.pipes(this.prRows[0]))[1];
    this.prDescription = h.tokens(h.pipes(this.prRows[1]))[1];
    this.prTags = h.tokens(h.pipes(this.prRows[2]))[1];
    this.prCtxtEntitiesNo = Number(h.tokens(h.pipes(this.prRows[3]))[2]);
    this.prSolNo = h.tokens(h.pipes(this.prRows[5+Number(this.prCtxtEntitiesNo)]))[2];
    this.prDefCounter = 7 + this.prCtxtEntitiesNo;
    console.log(this.prDefCounter);
    console.log(this.prRows[this.prDefCounter]);
    this.prTestNo = h.tokens(h.pipes(this.prRows[this.prDefCounter]))[1];

    for ( let entities = 0; entities < this.prCtxtEntitiesNo; entities++) {
      let row = '';
      let rowl = '';
      let rowA = [];
      row = h.pipes(this.prRows[4 + entities]);
      row = row.replace(/[|:|]+/g,'|');
      row = row.replace(/[|,|]+/g,'|');
      row = row.replace('|','');
      rowA = h.tokens(row);
      rowA.splice(0,0,'id', entities + 1, 'type');
      console.log(rowA);
      rowl = row + l;
      this.prCtxtRows.push(rowl);
    }
    
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
    'OUTPUT Tests: ' + this.prTestNo + l;


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

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }

}
