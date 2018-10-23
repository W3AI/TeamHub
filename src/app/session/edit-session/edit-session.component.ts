import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as dna from "../../logic/DNA";
import * as h from "../../logic/helper";

// l = new line - used in formatting
const l = '\n';
const L = 'L';  // TODO - [ ] - find other ways to include in txExpressions units of measure L - liter, etc

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit, AfterViewInit {
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

  defaultOperation = `Title	To fill				填写		भरना		لملء		Llenar		Заполнять		Preencher		A umple			
  Description	Top / Pour liquid from a recipient to another																			
  Tags	content, available																			
  INPUT	1	2																		
    Jar	,	name	:	fromJar	,	content	>	0											
    Jar	,	name	:	toJar	,	available	>	0											
                                          
  nGenes	1	1																		
    nr	,	name	: 	top	, 	language	:	JS	, 	expression	:	Math.min ( fromJar.content, toJar.available )							
                                          
  OUTPUT	1	2																		
    Jar	,	name	:	fromJar	,	updates	:	2	,	content	-=	top	;	available	+=	top			
    Jar	,	name	:	toJar	,	updates	:	2	,	content	 +=	top	;	available	-=	top			
                                          
  T&C	6	6																		
    ccy	,	name	:	CAD	,	dollar	:	0.01	,	seconds	:	2							
  PartsOfSpeech	ctxt	,	top	:	this.stepResults[0]	,	unit	:	L	,	fromJar	:	this.n[i1][this.n[i1].indexOf('name') + 1 ]	,	toJar	:	this.n[i2][this.n[i2].indexOf('name') + 1 ]			
  English	EN	,	noun	:	Jar	,	volume	:	5	,	content	:	0	,	available	:	5			
  English	EN	,	verb	:	top	,	expression	:	top {top} {unit} from {fromJar} to {toJar}											
  Chinese	ZH	,	名词	:	罐	,	体积	:	5	,	内容	:	0	,	可得到	:	5			
  Chinese	ZH	,	动词	:	最佳	,	expression	:	最佳 {最佳} {单元} 从 {fromJar} 至 {toJar}											`;

  // m is the memory of contexts and entities - initialized with context id = 0 ;
  m: any[][];                     // the memory array m - as in the dnas.js - to concatenate into it all emerging contexts
  stepCtxts: any[][];             // to concat during rnaCode execution the context arrays generated during the step - nr of them = nr branches
  t: any[][];                     // the transformations array - as in the dnas.js
  c: any[][];                     // the current context
  q: any[][];                     // the context to query to get the input param for the function / nGene
  n: any[];                       // new context holder from query result  

  qNamesArray: string[] = [];     // TODO - [ ] - to consider adding a symetric structure for test entity names that should also be unique 
  qOtherNames: string[] = [];     // the array of n strings (pipe concat) of n-1 names - to test / ensure unicity of entities in query results
  stepResults: any[] = [];        // To store the result of the op functions 
                                  // could also be implemented as an element of the opFunctionArray: 
                                  // eg: opFunctionArray[][11] = stepResults[]

  // RNA vars - (mainly) from dnas.js
  nodeIndex: number = 1;          // dnas.js - line: 10 - There will alwasy be at least an initial context
  txIndex: number = 0;            // dnas.js - line: 11 - To count the number of transformations (relations in the graph of context)
  memLimitMB: number = 1;         // dnas.js - line: 15 - memory limit in MB
  nodesMemSize: number = 0;       // 17 - We'll ccollect here the size of the nodes table
  entitiesNo: number = 0;         // ? Needed ? - 90 - Number of Entities in initial/current Context
  entityType = 1;                 // ? Needed ? - 98 - Number of Entities types
  nrSolutionsSought: number = 1;  // 101 - 
  stepsAllowed: number = 0;       // 105 - This should come either from definition of the problem or from the Innovation page where the Innovator should be able to change/experiment with different number of steps

  nodeHeader: string[] = ["id", "#" ,"type" ,"C/E" ,"name" ,"title" , "step" , "#", "branch", "#", "status", "Dn/TD","path","tasks"];
  transformationHeader = ["txId","#","from","id","to","id", "step","#","branch","#","What","verb","HMuch","Price","Changed","Chg","Sentence","Expression","License","Provider"];

  statesMemory = new Set();       // 294 - the statesMemory structure
  stateStampIni = '';             // 302 - to build the state/hash of the first context by adding the states of each entity

  rowId: number = 0;              // 332 - rowId on the Join table - Might Not be needed - TODO - [ ] - To Delete after nGene Dev!
  ctxtId: number = 1;             // 344 - initially we have just the initial context

  previousContextId: number = 0;  // dnas.js - line: 347
  currentContextId: number = 0;   // dnas.js - line: 348

  prCtxtResultRow: any[] = [];    // to store the results of the tests for the current context
  prCtxtsTestsResultsMatrix: any[][] = [];  // Matrix to store on lines for each context the result of the test on columns 
                                  // for now if the tests pass we push on the context line a string t + 'nr test' => [t1] [t2][t7] ... [tn]
                                  // TODO - [ ] - consider the option of storing? all results = full matrix!

  solutions = [];                 // 352 - Array to store the context solutions
  solutionPaths = [];             // 353 - In this array we'll store the strings / path of tx to a solution context e.g.: /2/7/20/31/47/57
  nrSolutions = 0;                // 354 - We initialize this with 0 -
  newSolution = false;

  steps: number = 1;              // dnas.js - line: 357 - steps - the depth of the solution graph
  branch: number = 1;             // branch - number of branches / results from the input query

  contextIdsList: number[] = [0]; // dnas.js - line: 363 - We start with a list with just the Id of the initial context = 0
  contextIdsToDo: number[] = [0]; // dnas.js - line: 369 - We'll keep and manage in this list the Ids of context ToDo
                                  // This will help to monitor combinatorial explosion, memory/resource usage, etc if list will grow exponential from step to step
  stepsInInvestorTable: number = 0; // 382 - First read the number of steps so far from the Investor Cell table

  txExpression = new Map();         // 670 - to express the sentence / verb / step details through a Natural Language verb expression rule

  testsPassed: number = 0;        // number of tests passes - we have a solution when when all tests prTestNo are passed 

  stateStamp: string = '';

  transformation: any[] = [];
  serviceVerb: string = 'pour';     // Default dev/test values -  to be update dynamically for each service / operation
  servicePrice: string = '1$';      // Default dev/test values -  to be update dynamically for each service / operation
  serviceAuthor: string = 'IL nGene';     // Default dev/test values -  to be update dynamically for each service / operation 

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
  opFunctionNo: number = 0;
  opFunctionRows: string[] = []; 
  opFunctionArray: any[][];
  opStepsCodes: string[] = []; 
  opOutputNo: number = 1;
  opOutputRows: string[] = [];
  opOutputArray: any[][];
  opUpdatesCodes: string[] = [];
  opTncNo: number = 1; 
  opTncRows: string[] = [];
  opTncArray: any[][];
  opTnc: {currency: string, ask: number, timeframe: number};
  opPartsOfSpeech: any[] = [];      // the array of key : code pairs fior the parts of speech from the Operation Spreadsheet 
  opPofSNo: number = 1;             // The number of Parts od Speech to express in some Natural Language the Step / Operation as a command, etc
  opFormatted: string = '';

  evenNumbers: number[] = [];

  // TODO - [ ] - finalize Query generation / Results extraction 
  // from Environment/Current Context 
  rnaCode: string = '';
  partialRnaResult: string = '';

  constructor() {
  this.m = [];  // TODO - [ ] - the initial context(s) will be added here 
  this.stepCtxts = [];  // each new step will start with a blanc stepCtxts array to accumulate all ctxt nodes during the step
  this.t = [];  // TODO - [ ] - previous transfromations to be eventually added / concat to t in case of previous runs and multiple ini contexts
  this.c = [["id",	0, "type", "Ctxt", "entities", 0,"step",   0,  "branch",   0, "status",     "ToDo", "path",""]];
  this.n = [];

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
    // TODO - [ ] - change t to test? or row? in below for loop 
    // TODO - [ ] - expand to include multiple conditions on multiple properties
    // + same for query/cond coder on the operation side
    for ( let t = 0; t<this.prTestNo; t++) {
      this.prTestArray[t][9] = dna.nBasicTestsCoder(t, this.prTestArray[t][3], this.prTestArray[t][6], this.prTestArray[t][7], this.prTestArray[t][8]);
    }

    // Run all tests on the initial context - same procedure to run later for all tests on all current contexts
    // - as coded in nBasicTestsCoder() with 
    //"... this.prTestArray[t][10 + n] = result[n]; ..." n = nr of results in a context
    this.n = this.c;
    for ( let t = 0; t<this.prTestNo; t++) {
      eval(this.prTestArray[t][9]);
    }

    // -- After problemIni:
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

    // Experimental - Reading the codes for the Parts of Speech from the spreadsheet
    // Get the number of PofS from the 2nd row of opTncArray
    this.opPofSNo = this.opTncArray[1].length - 5;
    console.log('-- Parts of Speech Number: ' + this.opPofSNo);
    // Read pairs of PoS from the opTncArray into the opPartsOfSpeech
    for (let pos = 0; pos < this.opPofSNo; pos++) {
       this.opPartsOfSpeech.push(this.opTncArray[1][5 + pos]);
    }
    console.log('-- Parts of Speech: ');
    console.log(this.opPartsOfSpeech.join('|'));

    // Generating the code for each opInputArray row
    // TODO - [ ] - expand to include multiple conditions on multiple properties
    for (let row = 0; row<this.opInputEntitiesNo; row++ ) {
      this.opInputArray[row][9] = dna.nBasicQueryCoder(row + 1, this.opInputArray[row][3], this.opInputArray[row][6], this.opInputArray[row][7], this.opInputArray[row][8]);
    }

    // Generating the code for each Step / Function in the opFunctionArray - 
    // TODO - [ ] - nr of steps and args for each step/function could be a configuration param relatable to the memory / processors etc available 
    // TODO - [ ] - expand to include multiple arguments (constants) not just the ones in opInputArray 
    for (let row = 0; row<this.opFunctionNo; row++ ) {

      // Parse the step / function expression
      let exp = '';
      exp = this.opFunctionArray[row][9]
      // Remove the commas
      const commas = /,/g;
      exp = exp.replace(commas, '');
      console.log('-- Function Expression:');
      console.log(exp);
      // get an array of the tokens
      let expArray = [];
      expArray = h.tokens(exp);

      console.log('-- Function expArray:');
      console.log(expArray.join('|'));

      // TODO - [ ] - implement grouping of inputArray by step/functions input/arguments to allow multiple steps with different input arg order etc
      // For now we'll have just functions with the same order of args as in the input query 
      // Parse each argument of the function from spreadsheet and format with nBasicArgCoder()
      // For now we assume there is allways a spredsheet or JS function on element 0, a '(' in element 1 and ')' as last element in expArray
      
      let params = [];
      for(let p = 2; p < expArray.length - 1; p++) {
        // Parse each param/arg and see if contains a '.'
        // if true before the dot should be an entity name and after the dot should be a property name
        let entityName = '';
        let propertyName = '';
        let qEntNo: number;
        let dotIndex = -1;
        dotIndex = expArray[p].indexOf('.');
        if (dotIndex != -1) {
          let strLength = expArray[p].length;
          entityName = expArray[p].slice(0, dotIndex);
          propertyName = expArray[p].slice(dotIndex + 1, strLength);

          console.log('-- Param Entity Name: ' + entityName + ' .  Param Property Name: ' + propertyName);
          
          // Get Query entity number based on the entity name
          for(let inputIndex = 0; inputIndex < this.opInputArray.length; inputIndex++) {
            if (this.opInputArray[inputIndex].includes(propertyName)) {
              qEntNo = inputIndex;
            }
          } 
          expArray[p] = dna.nBasicArgCoder(qEntNo + 1, propertyName);
        }
        params.push(expArray[p]);
      }
      // console.log('-- params:');
      // console.log(params);

      // conactenate the function string as expArray[0] + expArray[1] + ... + expArray(last)
      // this.opFunctionArray[row][10] =    Function    + ' ( '       + ... + ')'
      this.opFunctionArray[row].push(expArray[0] + expArray[1] + params.join() + expArray[expArray.length - 1]);

      this.opStepsCodes.push(this.opFunctionArray[row][10]);

      console.log('-- Function expJS:');
      console.log(this.opFunctionArray[row][10]);
    }

    // Generate the update codes for each result / step / row in the opFunctionArray
    // with 3 for loops for iterating through results, entities and properties
    // Sample generated update codes:
    // this.n[i1][this.n[i1].indexOf('content') + 1 ] -= this.stepResults[0]; 
    // this.n[i1][this.n[i1].indexOf('available') + 1 ] += this.stepResults[0]; 
    // this.n[i2][this.n[i2].indexOf('content') + 1 ]  += this.stepResults[0]; 
    // this.n[i2][this.n[i2].indexOf('available') + 1 ] -= this.stepResults[0]; 
    for (let result = 0; result < this.opFunctionArray.length; result++) {
      for (let entity = 0; entity < this.opOutputArray.length; entity++) {
        for (let prop = 0; prop < this.opOutputArray[entity][7]; prop++) {
          let updateCode: string = `this.n[i${entity + 1}][this.n[i${entity + 1}].indexOf('${this.opOutputArray[entity][8 + 4*prop]}') + 1 ] ${this.opOutputArray[entity][9 + 4*prop]} this.stepResults[${result}]; `;
          this.opOutputArray[entity].push(updateCode);
          console.log(`-- -- -- updateCode[${result}][${entity}][${prop}]:`);
          console.log(updateCode);
          this.opUpdatesCodes.push(updateCode);
        }
      }
    }

    // -- After operationIni:
    console.log('-- After nGeneIni:');
    console.log('Operation - opInputArray:');
    console.log(this.opInputArray);
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

    // Test qNames and qOthers functions
    this.q = this.c;
    console.log('-- this.q:');
    console.log(this.q);
    eval(dna.qNames());
    eval(dna.qOthers());
    console.log('-- qNamesArray:');
    console.log(this.qNamesArray);
    console.log('-- qOtherNames:');
    console.log(this.qOtherNames);
    console.log('-- this.q:');
    console.log(this.q);

    // Initializations on the initial Context before the step by step function / onInnoVote()

    // dnas.js line: 93 - number of nodes in the initial context including the context node
    this.nodeIndex = this.c.length;

    // dnas - 301 - Buid the state/hash of the first context by adding the states of each entity
    for (let entityId = 1; entityId <= this.c.length-1; entityId++) {
      // add values starting from Name / exclude node ids which are always increased / different
      for (let propertyId = 3; propertyId <(this.c[entityId].length + 1)/2 - 1; propertyId++ ) {
        this.stateStampIni += this.c[entityId][2*propertyId + 1];
      }
    }
    this.statesMemory.add(this.hashCode(this.stateStampIni));

    // Testing the statesStamp - should be same as the one generated by dnas - TODO - [X] - Confirmed !!! - Yey :-)
    // console.log(" --- stateStampIni:");
    // console.log(this.stateStampIni);
    // console.log(" --- hashCode(stateStampIni):");
    // console.log(h.hashCode(this.stateStampIni));
    // console.log(' --- Initial statesMemory size:');
    // console.log(this.statesMemory.size);
    // console.log(this.statesMemory);

    console.log('== END of ngOnInit() ==');

    // Create memory table headers in ngAfteViewInit
    // and show the initial context same as in flipper / main.html

  } // END ngOnInit() ----------------------------- END ngOnInit() ----------------------- END ngOnInit() --------------------------

  onInnoVote() {

    // TODO - [ ] - move rnaCode builder out of onInnoVote() to not have it recalculated at each click 

    // -- Eval Solver / rnaCoder function - based on the innoVote() from dnas.js - lines 379 - 796 <<<<<----------------------<<<<<<
    // to be launched / controlled from Step / Start / Stop button(s)

    // All basic initializations and test and step/functions codes are generated in ngOnInit() 

    let partialRnaResult: any;  // To test intermediary results
    let partialRnaString = '';  // `this.partialRnaResult += this.q[i1][5] +  ' ' + this.q[i2][5] + '\\n';` ;

    // Start building the rnaCode string to evaluate
    this.rnaCode = `
    this.partialRnaResult = '';
    `+ 
    dna.nForHeader(this.opInputEntitiesNo, '  ', 'i', 1, '<', this.q.length, '++') +
    dna.nQuery2IfHeader('    ', this.opInputArray[0][9], this.opInputArray[1][9]) + 
    `// -- Start Testing Query results
    // TODO - [ ] - Comment partialRnaResults lines after algo dev and testing - but leave the lines in for future testing
    this.partialRnaResult += this.q[i1][5] +  ' ' + this.q[i2][5] + '\\n';
    // -- End Testing Query results
    `+ 
    `// dnas.js line: 477
    this.n = [];  
    for (let id = 0; id < this.q.length; id++) {
      this.n[id] = this.q[id].slice();
    }
    this.previousContextId = this.n[0][1];
    // dnas.js line: 484 - Update the node index of the new array context + entities
    for (let x = 0; x < this.n.length; x++) {
      this.n[x][1] = this.nodeIndex;
      this.nodeIndex++;
    }

    // dnas.js line: 490 - also update the transformations / transactions index
    this.txIndex++;
    // add for Context node the index of the transformation/tx that generated the context
    // for now n[0][12] = "fromTx" and n[0][13] is the id of the tx to the context
    this.n[0][13] += "/" + this.txIndex;
    // Change new context status to ToDo
    this.n[0][11] = "ToDo";
    // Update currentContextId
    this.currentContextId = this.n[0][1];

    // dnas.js line: 503 - Add every new context to the contextIdsList
    this.contextIdsList.push(this.currentContextId);
    // Here we just copyed a context with a ToDo status
    // so we have to add it to the ToDo contexts list at the end - with method push
    this.contextIdsToDo.push(this.currentContextId);
    // Update the solution step and branch for the new copied context
    this.n[0][this.n[0].indexOf("step") + 1] = this.steps;
    this.n[0][this.n[0].indexOf("branch") + 1] = this.branch;
    // TODO - [X] - To update ++ branch and ctxtId as in dnas.js line 749-750-751, etc
    `+
    dna.nForStepResults(this.opStepsCodes) + 
    dna.nForStepUpdates(this.opUpdatesCodes) + 
    dna.nForTxExpression(this.opPartsOfSpeech) + 
    `
    // 534 - Compute current stateStamp same as stateStampIni on the current context n[]
    this.stateStamp = "";
    for (let entityId = 1; entityId <= this.n.length-1; entityId++) {
      // add values starting from Name / exclude node ids which are always increased / different
      for (let propertyId = 3; propertyId <(this.n[entityId].length + 1)/2 - 1; propertyId++ ) {
        this.stateStamp += this.n[entityId][2*propertyId + 1];
      }
    }

    // 565 - If we have the stateStamp of the context in memory then we already tested this context
    if (this.statesMemory.has(this.hashCode(this.stateStamp))) {
      this.n[0][11] = "Done";
      // if status is Done then it should be removed from the contextIdsToDo
      this.contextIdsToDo.splice(-1,1);
    } else {
      this.statesMemory.add(this.hashCode(this.stateStamp));
    }
    // TODO - [ ] - to check hashCodes / statesMemory after this point <<<<-------<<<< TODO !!!
    
    // 587 - Testing the current contexts
    `+
    dna.nTests(this.prTestArray) +
    `
    // 588 - Checking to see if all tests are passed in current context
    // the project Contexts Test Results Matrix was updated above
    // We have a solution passing all test when length of prCtxtResultRow - 3 >=  this.prTestNo
    let nrTestsPassed = this.prCtxtResultRow[0].length - 3;
    if ( nrTestsPassed >= this.prTestNo ) {
      // TODO - [ ] - Consider options for multiple results in one context
      // 595 - updating the context status with the number of the test Passed
      this.n[0][this.n[0].indexOf("status") + 1] = "P" + nrTestsPassed;
      // ~ 599 - Copy the id of the solution context into the array of solutions
      this.solutions = this.solutions.concat(this.n[0][1]);   // TODO - [ ] - make it a push
      this.solutionPaths.push(this.n[0][13]);
      this.nrSolutions++;
      this.newSolution = true; 
    }
    

    // Build/update the table rows for nodes (contexts, entities) and transformations 
    // + TODO - [ ] - later add D3 visualization of the evolving solution search graph

    // 620 - Adding the memory used in b for each of the nodes in the new context n
    for (let iMem = 0; iMem < this.n.length; iMem++) {
      this.nodesMemSize += JSON.stringify(this.n[iMem]).length*8;
    }

    // 628 - Break out of the mainLoop = all loops if reched memory limit
    // TODO - [ ] - deactivate the TypeScript error TS7028: Unused label
    if (this.nodesMemSize >= this.memLimitMB*1000000) {
      console.log("--- Nodes Memory used: " + this.nodesMemSize + " Passed Memory Limit of: " + this.memLimitMB + "MB");
      // break mainLoop;
    }

    // 634 - update the nodes and transformations number in the memory table on the page
    // TODO - [ ] - replace with string interpolation {{ nodeIndex }} and {{ txIndex }}
    // For now moved after the rnaCode
    // h.updateNodesNo(nodeIndex);
    // h.updateTxNo(txIndex);

    // 638 - add context n [] to nodes table on the page
    // TODO - [ ] - replace with string / textrea interpolation or Angular Mat Table, etc
    // For now moved after the rnaCode
    // addContextToMemoryTable("nodes", ctxtId, n);

    // 650 - add new context to memory nodes m array
    this.m = this.m.concat(this.n);
    // also add context n[] to the list of nodes (ctxts and entities) generated during the step - nr of ctxts = nr branches
    this.stepCtxts = this.stepCtxts.concat(this.n);

    // 653 - Add Transformations / relations / links to describe the steps of the solutions
    // TODO - [ ] - Add to DNA Script Editor T&C one or more expression patterns in the advance section
    this.transformation = [];
    this.transformation = [
      "txId",this.txIndex,
      "source",this.previousContextId,
      "target",this.currentContextId,
      "step",this.steps,
      "branch",this.branch,
      "verb",this.serviceVerb,
      "cost",this.servicePrice,
      "changed",this.stepResults[0],
      // For DNA Engine testing - TODO - [ ] - add/use for sentence build txExpArray = txExpression.entries !!! 
      "sentence", "from" + " " + this.txExpression.get('fromJar') + " " + "to" + " " + this.txExpression.get('toJar'),
      "MIT",this.serviceAuthor
    ];

    // 674 - Add transformation to Transformations table
    // TODO - [ ] - replace with string / textrea interpolation or Angular Mat Table, etc
    // addTableRow("transformations",ctxtId, transformation);

    // 677 - add new transformation to memory transformations t array
    this.t.push(this.transformation);

    `+
    dna.nQuery2IfFooter('    ') + 
    dna.nForFooter(this.opInputEntitiesNo, '  ');
    // End of rnaCode string

    console.log('-- String to evaluate: this.rnaCode');
    console.log(this.rnaCode); 

    // We have the rnaCode built including references to the specific Project / Operation tuple
    // Here we code the mainLoop (391) non-specific statements surrounding the eval(rnaCode)

    // TODO - [] - Add input fields (steps, budget, timeframe) and a textarea for solution/plan just below the buttons
    // For now we have stepsInInvestorTable initialized to 0 in ngOnInit
    // Increase the number of steps and write it back to the table
    this.stepsInInvestorTable++;                      // 385

    this.stepsAllowed = this.stepsInInvestorTable;    // 388

    console.log("-- ========= -- q before mainLoop q:");
    console.log(this.q);

    console.log('-- ======== -- before mainLoop -- this.contextIdsToDo:');
    console.log(this.contextIdsToDo);

    // mainLoop:                                      // 391
    while ( (this.steps<=this.stepsAllowed) && (this.nrSolutions<=this.nrSolutionsSought) && (this.contextIdsToDo.length>0) && (this.nodesMemSize<this.memLimitMB*1000000) ) {

      // 401 - adding context free & ops free statements until the Input Query for loops
      let xIdToDoThisStep = this.contextIdsToDo.length;

      // 404 - Iterate through the contextIdsToDo array
      for (let xId = 0; xId < xIdToDoThisStep; xId++) {

        // 412 - 419
        console.log("xId : " + xId);
        console.log("contextIdsToDo.length : " + this.contextIdsToDo.length);
        console.log("steps : " + this.steps);
        console.log("xIdToDoThisStep:");
        console.log(xIdToDoThisStep);
        console.log("contextIdsToDo[xId]:");
        console.log(this.contextIdsToDo[xId]);
        console.log("m[contextIdsToDo[xId]][5] : " + this.m[this.contextIdsToDo[xId]][5]);

        // 420 - Copy in a context q the context to query
        this.q = [];
        // Index of nr of entities is 5; in condition we have +1 to include the node of the context
        for (let qId = 0; qId < this.m[this.contextIdsToDo[xId]][5] + 1; qId++) {
          this.q[qId] = this.m[this.contextIdsToDo[xId] + qId].slice();
        }
        console.log("q:");
        console.log(this.q);

        console.log('--#######: this.m[this.contextIdsToDo[xId]][11]: ' + this.m[this.contextIdsToDo[xId]][11]);
        this.m[this.contextIdsToDo[xId]][11] = "Done";  // 432
        console.log('--#######: this.m[this.contextIdsToDo[xId]][11]: ' + this.m[this.contextIdsToDo[xId]][11]);

        console.log("######### contextIdsToDo at " + this.q[0][1] + " : " + this.contextIdsToDo.join());  // 434

        this.branch = 1;  // 446

        // rnaCode includes equivalent dnas lines ~ 450 - 526  with nForHeaders and nQuery2IfHeader to closing brakets <<<<<<<<-----------<<<<<<< eval rnaCode
        eval(this.rnaCode);

        // Check txExpression
        console.log("######### txExpression: ");
        console.log(this.txExpression);

        // 635 - update the nodes and transformations number in the memory table on the page
        h.updateNodesNo(this.nodeIndex);
        h.updateTxNo(this.txIndex);

        // Deduct 1 from the branch and ctxtId due to the last branch++ and ctxtId++ increment in the rnaCode
        this.branch--;
        // this.ctxtId--;  // ? we might need to increase after adding to tables
        // Show nr of branches = contexts and tx to add from the Memory m[] and Transformation t[] arrays 
        console.log('-- =============== -- this.branch: ' + this.branch);
        console.log('-- ============== -- this.ctxtId: ' + this.ctxtId);
        console.log('-- ============== -- this.steps: ' + this.steps);
        console.log('-- ============== -- this.m.length: ' + this.m.length);

        // 638 - add step's contexts to the nodes table on the page 
        h.addContextToMemoryTable("nodes", this.steps, this.stepCtxts);
        // clear the stepsCtxts
        this.stepCtxts = [];

        for (let b = 0; b < this.branch; b++) {
          // using ctxtId - 1 to include the ids of the contexts generated on this step
          // 674 - Add transformation to Transformations table
          h.addTableRow("transformations", b + this.ctxtId - 1, this.t[this.t.length - this.branch + b]);
        }

      } // END Iterate through the contextIdsToDo array

      // 785 - Here must be operated the changes additions/deletions to the contextIdsToDo array
      this.contextIdsToDo.splice(0,xIdToDoThisStep);

      // 792
      this.steps++;

    } // END main while loop

    console.log('-- this.partialRnaResult:');
    console.log(this.partialRnaResult);

    console.log('-- this.stepResults:');
    console.log(this.stepResults);

    console.log('-- this.n:');
    console.log(this.n);

    console.log('-- this.previousContextId: ' + this.previousContextId);
    console.log('-- this.currentContextId: ' + this.currentContextId);
    console.log('-- this.nodeIndex: ' + this.nodeIndex);

    console.log('-- this.m:');
    console.log(this.m);

    console.log('-- this.t:');
    console.log(this.t);

    console.log('-- this.contextIdsToDo:');
    console.log(this.contextIdsToDo);

    console.log('-- this.prTestArray[0].length:');
    console.log(this.prTestArray[0].length);

    console.log('-- this.prTestArray:');
    console.log(this.prTestArray);

    console.log('-- this.prCtxtsTestsResultsMatrix');
    console.log(this.prCtxtsTestsResultsMatrix);

    console.log('-- this.solutions:');
    console.log(this.solutions);

    console.log('-- this.solutionPaths:');
    console.log(this.solutionPaths);

    // END eval rnaCode

  }

  ngAfterViewInit() {
    // Build Nodes and Transformations Headers for the memory tables
    h.buildTableHeader("nodes",this.nodeHeader);
    h.buildTableHeader("transformations", this.transformationHeader);

    this.entitiesNo = this.c.length - 1;
    console.log("-- Entities in the Initial Context: " + this.entitiesNo);

    this.nodeIndex = this.c.length;
    console.log("NodeIndex = " + this.nodeIndex);

    // Build Context 0 in the nodes table
    for( let i = 0; i <= this.entitiesNo; i++) {
      h.addTableRow("nodes", 0, this.c[i]);
      // Summing up the memory for the nodes in the initial context
      this.nodesMemSize += JSON.stringify(this.c[i]).length*8;
    }

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
        // const below are pipes + character: eg |:
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
        // remove single comma tokens ','
        for (let t = 0; t < rowA.length; t++) {
          if (rowA[t] == ',') {
            rowA.splice(t, 1);
          }
        } 
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

  /** https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
 * Returns a hash code for a string.
 * (Compatible to Java's String.hashCode())
 *
 * The hash code for a string object is computed as
 *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * @param {string} s a string
 * @return {number} a hash code value for the given string.
 */
  hashCode(s: string): number {
    var h = 0, l = s.length, i = 0;
    if (l > 0)
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
  }


}
