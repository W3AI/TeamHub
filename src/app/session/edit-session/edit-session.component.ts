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
  defaultProject = `Title	4l Innovation				4升创新		4L अभिनव		الابتكار 4L		Innovación 4l		4l инноваций		Inovação 4l		Inovație 4L			
  Description	Find a way to share 4 Liters of Innovation Sauce with a friend when you have 3 recipients of 3, 5 and 8 liters and 8 liters of Innovation Sauce in the largest recipient.																			
  Tags	content, available																			
  INPUT	1	3																		
    Jar	,	name	:	Jar3L	,	volume	:	3	,	content	:	0	,	available	:	3			
    Jar	,	name	:	Jar5L	,	volume	:	5	,	content	:	0	,	available	:	5			
    Jar	,	name	:	Jar8L	,	volume	:	8	,	content	:	8	,	available	:	0			
                                          
  nGenes	?	1																		
                                          
  OUTPUT	1	1																		
    Jar	,	name	:	ANY	,	content	==	4											
                                          
  T&C	2	2																		
    ccy	,	name	:	CAD	,	dollar	:	1	,	seconds	:	60							
    Jar	,	name	:	dict_EN	,	volume	:	5	,	content	:	0	,	available	:	5			`;

  defaultOperation = `Title	To fill				填写		भरना		لملء		Llenar		Заполнить		Preencher		A umple			
  Description	Top / Pour liquid from a recipient to another																			
  Tags	content, available																			
  INPUT	1	2																		
    Jar	,	name	:	fromJar	,	content	>	0											
    Jar	,	name	:	toJar	,	available	>	0											
                                          
  nGenes	2	2																		
    nr	,	name	: 	top	, 	language	:	GAS	, 	expression	:	MIN(fromJar.content, toJar.available)							
    nr	,	name	: 	top	, 	language	:	JS	, 	expression	:	Math.min(fromJar.content, toJar.available)							
                                          
  OUTPUT	1	2																		
    Jar	,	name	:	fromJar	,	content	-=	top	;	available	 +=	top							
    Jar	,	name	:	toJar	,	content	 +=	top	;	available	-=	top							
                                          
  T&C	5	5																		
    ccy	,	name	:	CAD	,	dollar	:	0.01	,	seconds	:	2							
  English	EN	,	noun	:	Jar	,	volume	:	5	,	content	:	0	,	available	:	5			
  Chinese	ZH	,	名词	:	罐	,	卷	:	5	,	内容	:	0	,	可得到	:	5			
  English	EN	,	verb	:	top	,	expression	:	top $_{top} $_{unit} from $_{from_Jar} to $_{to_Jar}											
  Chinese	ZH	,	动词	:	最佳	,	expression	:	最佳 $_{最佳} $_{单元} 从 $_{fromJar} 至 $_{toJar}											`;

  // m is the memory of contexts and entities - initialized with context id = 0 ;
  m: any[][];                     // the memory array m - as in the dnas.js - to concatenate into it all emerging contexts
  t: any[];                       // the transformations array - as in the dnas.js
  c: any[][];                     // the current context
  q: any[][];                     // the context to query to get the input param for the function / nGene

  // Problem Class structures:
  prRows: any[] = [];
  prDefLines: number = 0;
  prDefCounter: number = 0;
  prTitle: string = '';
  prDescription: string = '';
  prTags: string = '';
  prCtxtEntitiesNo: number = 1;   // at least 1 entity definition is needed, etc
  prCtxtRows: string[] = [];      // contextRows
  prEntArray: any[][];            // the entity array to be formatted and added to m - memory Array initiated above
  prSolNo: number = 1;               // usually at least 1 solution is needed
  prSolRows: string[] = [];       // solutionRows
  prSolArray: any[][];            // Here are the plan/path = Sequence of task lines
  prTestNo: number = 1;           // at least 1 test is needed in defining a problem/project
  prTestRows: string[] = [];
  prTestArray: any[][];
  prTncNo: number = 1; 
  prTncRows: string[] = [];
  prTncArray: any[][];
  prTnc: {currency: string, bid: number, timeframe: number};
  prFormatted: string = '';     

  oddNumbers: number[] = [];

  // Operation Class structures:
  opRows: any[] = [];
  opDefLines: number = 0;
  opDefCounter: number = 0;
  opTitle: string = '';
  opDescription: string = '';
  opTags: string = '';
  opInputEntitiesNo: number = 0;  // there might be no innput entities - nGene might generate entities in the context
  opInputRows: string[] = [];
  opInputArray: any[][];
  opInputQNames: string[] = [];   // TODO - [ ] - to consider adding a symetric structure for test entity names that should also be unique 
  opFunctionNo: number = 0;
  opFunctionRows: string[] = []; 
  opFunctionArray: any[][];
  opOutputNo: number = 1;
  opOutputRows: string[] = [];
  opOutputArray: any[][];
  opTncNo: number = 1; 
  opTncRows: string[] = [];
  opTncArray: any[][];
  opTnc: {currency: string, ask: number, timeframe: number};
  opFormatted: string = '';

  evenNumbers: number[] = [];

  // TODO - [ ] - finalize Query generation / Results extraction 
  // from Environment/Current Context 
  opInputFunction: string = '';
  solution: any = '';
  planFStart: string = `solution = function( `;  // the start string for JS planner function
  planFBody: string = '';
  planFEnd: string = `;`;
  result: string = 'console.log("Eval solution = ") + this.solution;'; 

  sum: any = 0;
  testSumString: string = 'this.sum += 10;';

  constructor() {
  this.m = [];  // TODO - [ ] - the initial context(s) will be added here 
  this.t = [];  // TODO - [ ] - previous transfromations to be eventually added / concat to t in case of previous runs and multiple ini contexts
  this.c = [["id",	0, "type", "Ctxt", "entities", 0,"step",   0,  "branch",   0, "status",     "ToDo", "path",""]];
  
  this.prEntArray = [];
  this.prSolArray = [];
  this.prTestArray = [];
  this.prTncArray = [];
  this.prTnc = {currency: 'USC', bid: 0, timeframe: 30};

  this.opInputArray = [];
  this.opFunctionArray = [];
  this.opOutputArray = [];
  this.opTncArray = [];
  this.opTnc = {currency: 'USC', ask: 0, timeframe: 30};
}

  ngOnInit() {
    // Initialize Problem structures from defaultProject in accordance with the Excel/GSheets structure
    this.prRows = h.lines(this.defaultProject);
    // console.log(this.prRows);
    this.prDefLines = this.prRows.length;
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
    // console.log("prDefCounter:" + this.prDefCounter);
    this.prSolNo = Number(h.tokens(h.pipes(this.prRows[this.prDefCounter]))[2]);
    // TODO - [ ] - To Format prSolRows(+ branches) for Resuming Projects
    this.prDefCounter += this.prSolNo + 1;   // including a blank line to OUTPUT / Tests <------- TODO - [ ] - here to add the prSolNo !!!
    this.prTestNo = Number(h.tokens(h.pipes(this.prRows[this.prDefCounter]))[2]);
    this.prDefCounter += 1;
    // Format prTestRows
    this.prTestArray = this.formatRows(this.prRows, 'test', this.prDefCounter, this.prTestNo, this.prTestRows, this.prTestArray);
    this.prDefCounter += this.prTestNo + 1;   // including a blank line to T&C
    this.prTncNo = Number(h.tokens(h.pipes(this.prRows[this.prDefCounter]))[2]);
    this.prDefCounter += 1;
    this.prTncArray = this.formatRows(this.prRows, 'TnC', this.prDefCounter, this.prTncNo, this.prTncRows, this.prTncArray);
    this.prTnc.currency = this.prTncArray[0][5];
    this.prTnc.bid = this.prTncArray[0][7];
    this.prTnc.timeframe = this.prTncArray[0][9];
    // console.log(this.prTncArray);
    // console.log("-- T&C : " + this.prTnc.currency + " , " + this.prTnc.bid +  " , " + this.prTnc.timeframe);

    // Generating the code for each test = the Function code to be added to each test/row of the prTest Array
    for ( let t = 0; t<this.prTestNo; t++) {
      this.prTestArray[t][9] = dna.nBasicTestsCoder(this.prTestArray[t][3], this.prTestArray[t][6], this.prTestArray[t][7], this.prTestArray[t][8]);
    }

    // Run all tests on the initial context - same procedure to run later for all tests on all current contexts
    // - as coded in nBasicTestsCoder() with 
    //"... this.prTestArray[t][10 + n] = result[n]; ..." n = nr of results in a context
    for ( let t = 0; t<this.prTestNo; t++) {
      eval(this.prTestArray[t][9]);
    }

    // -- After problemIni:
    // console.log('-- After problemIni:');
    // console.log('Problem - prEntArray:');
    // console.log(this.prEntArray);
    // console.log('Problem - Context:');
    // console.log(this.c);
    // console.log('Problem - prSolArray:');
    // console.log(this.prSolArray);
    // console.log('Problem - prTestArray:');
    // console.log(this.prTestArray);
    // this.m = this.c;
    // console.log('Memory - m initialized:');
    // console.log(this.m);

    this.prFormatted = 
    'Title: ' + this.prTitle + l +
    'Description: '+ this.prDescription + l + 
    'Tags: '+ this.prTags + l +
    l +
    'INPUT: ' + this.prCtxtEntitiesNo + l +
    this.prCtxtRows +
    l +
    'Solutions/Plans Min: ' + this.prSolNo + l +
    l + 
    'OUTPUT Tests: ' + this.prTestNo + l +
    this.prTestRows + 
    l +
    'T&C: ' + this.prTncNo + l +
    this.prTncRows;
    // END Initialize Project structures from --------- defaultProject -------- //

    // Initialize Operation structures from --------- defaultOperation -------- //
    this.opRows = h.lines(this.defaultOperation);
    // console.log(this.opRows);
    this.opDefLines = this.opRows.length;
    this.opTitle = h.tokens(h.pipes(this.opRows[0]))[1];
    this.opDescription = h.tokens(h.pipes(this.opRows[1]))[1];
    this.opTags = h.tokens(h.pipes(this.opRows[2]))[1];
    this.opInputEntitiesNo = Number(h.tokens(h.pipes(this.opRows[3]))[2]);
    // this.i[0][5] = this.opInputEntitiesNo;   <<---------------------------<< Q: Do we want to manage here multiple Operations? hence multiple Inputs for diff Ops?
    // TODO - [ ] - add TS/ng Venture component for selecting available Operations on scope/cost/performance/etc criteria
    this.opDefCounter = 4; // nr of lines until/including INPUT line 
    // Format Input Entities rows
    this.opInputArray = this.formatRows(this.opRows, 'input', this.opDefCounter, this.opInputEntitiesNo, this.opInputRows, this.opInputArray); 
    // Place to add Inputs to the overall list of inputs for the selected operations
    this.opDefCounter += this.opInputEntitiesNo + 1;
    // console.log("opDefCounter:" + this.opDefCounter);
    this.opFunctionNo = Number(h.tokens(h.pipes(this.opRows[this.opDefCounter]))[2]);
    this.opDefCounter += 1;
    this.opFunctionArray = this.formatRows(this.opRows, 'nGene', this.opDefCounter, this.opFunctionNo, this.opFunctionRows, this.opFunctionArray);
    this.opDefCounter += this.opFunctionNo + 1;
    this.opOutputNo = Number(h.tokens(h.pipes(this.opRows[this.opDefCounter]))[2]);
    this.opDefCounter += 1;
    this.opOutputArray = this.formatRows(this.opRows, 'output', this.opDefCounter, this.opOutputNo, this.opOutputRows, this.opOutputArray); 
    this.opDefCounter += this.opOutputNo + 1;
    this.opTncNo = Number(h.tokens(h.pipes(this.opRows[this.opDefCounter]))[2]);
    this.opDefCounter += 1;
    this.opTncArray = this.formatRows(this.opRows, 'TnC', this.opDefCounter, this.opTncNo, this.opTncRows, this.opTncArray);
    this.opTnc.currency = this.opTncArray[0][5];
    this.opTnc.ask = this.opTncArray[0][7];
    this.opTnc.timeframe = this.opTncArray[0][9];

    // build opInputQNames array of the names in the opInputArray
    for (let i = 0; i < this.opInputArray.length; i++) {
      this.opInputQNames.push(this.opInputArray[i][5]); // name eg: fromJar is the  6th element of the row
    }

    // -- After operationIni:
    console.log('-- After nGeneIni:');
    console.log('Operation - opInputArray:');
    console.log(this.opInputArray);
    console.log('Operation - opInputQNames:');
    console.log(this.opInputQNames);
    console.log('Operation - opFunctionArray:');
    console.log(this.opFunctionArray);
    console.log('Operation - opOutputArray:');
    console.log(this.opOutputArray);
    console.log('Operation - opTncArray:');
    console.log(this.opTncArray);
   
    console.log('Transformations - t initialized:');
    console.log(this.t);

    this.opFormatted = 
    'Title: ' + this.opTitle + l +
    'Description: '+ this.opDescription + l + 
    'Tags: '+ this.opTags + l +
    l +
    'INPUT ' + this.opInputEntitiesNo + l +
    this.opInputRows +
    l + 
    'nGenes: ' + this.opFunctionNo + l + 
    this.opFunctionRows +
    l + 
    'Output: ' + this.opOutputNo + l +
    this.opOutputRows +
    l +
    'T&C: ' + this.opTncNo + l +
    this.opTncRows;


    // Test eval Solver function - to be launched from Project Start / Stop button(s)
    let entitiesNo = this.prCtxtEntitiesNo;   // should be 3 in eval
    this.opInputFunction = 
    dna.nForHeader(2, '  ', 'i', 1, '<=', 'entitiesNo', '++') + 
    this.testSumString + 
    dna.nForFooter(2, '  ');
    console.log('-- String/Function to evaluate: this.opInputFunction');
    console.log(this.opInputFunction);
    this.solution = eval(this.opInputFunction);
    console.log('-- this.solution:');
    console.log(this.solution);

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
        // console.log('-- Row after h.pipes: ' + row);
        const colons = /\b\|:\|\b/g; const colons_ = /\b\|: \|\b/g;
        const commas = /\b\|,\|\b/g; const commas_ = /\b\|, \|\b/g;
        const spaces = /\b\| \|\b/g;
        row = row.replace('    ', '');
        row = row.replace('  ', '');
        row = row.replace(colons, '|'); row = row.replace(colons_, '|');
        row = row.replace(commas, '|'); row = row.replace(commas_, '|');
        row = row.replace(spaces, '|');
        eLines.push(row + l);
        rowA = h.tokens(row);
        rowA.splice(0, 0, 'id', e + 1, type);
        // console.log(rowA);
        eArray[e] = rowA;
      }
      // console.log(eArray.length);
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
