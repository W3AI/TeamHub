// Dynamic Natural Activation Algorithm - Functional body parts
// Copyright Ianta Labs / MIT license

const l = '\n';

// nBasicTestsCoder() - Generates the code of the test functions to include in the prTestArray
// TODO - [ ] - To add tests for multiple properties of the same entity
// based on test_1 template in dnas.js lines 120 - 136
// function test_1(contextArray, entityType, propertyName, conditionalTest, propertyValue) {
//   var context = contextArray.slice();
//   var result = [];
//   var n = 0;  // Number of results
//   for (var i = 1; i < context.length; i++) {
//     // On Server side the if should be inside a case on the conditionalTest e.g. here switch/case = "="
//     if ( ( context[i][context[i].indexOf("type") + 1] == entityType ) & ( context[i][context[i].indexOf(propertyName) + 1] == propertyValue )) {
//       // console.log("Test passed in Context id = " + context[0][1] + " at entity name = " + context[i][context[i].indexOf("name") + 1]);
//       // Write Result structure
//       // Added Step and branch to result context structure
//       // TODO - Add time in ms and calculated time similar to nanosecs !!!!!!!!!!!!!!!!!!!!!
//       result[n] = ["contextId", context[0][1], "step", context[0][context[0].indexOf("step") + 1], "branch", context[0][context[0].indexOf("branch") + 1], "entityId", i, "entityType", entityType, propertyName, propertyValue];
//       n++;
//     }
//   }
//   return result;
// }
// TODO - [X] - arrange for testing the initial context that n[] = c[] - the initial context
function nBasicTestsCoder(testId: number, entType: string, propName: string, condition: string, propVal: string ): string {
  let testFunction: string = `
    let c = this.n.slice();
    let result = [];
    let resultStr = '';
    let n = 0;  // Number of results
    // iterate through the entities in the context
    for (let i = 1; i < c.length; i++) {
      // Check if a property value pass the condition
      if ( ( c[i][c[i].indexOf("type") + 1] == '${entType}' ) & ( c[i][c[i].indexOf('${propName}') + 1] ${condition} ${propVal} )) {
        result[n] = ["contextId", c[0][1], "step", c[0][c[0].indexOf("step") + 1], "branch", c[0][c[0].indexOf("branch") + 1], "entityId", i, "entType", "${entType}", "${propName}", ${propVal}];
        this.prTestArray[${testId}].push(result[n]);  //  testId + 1 in order to start test numbers from 1 not 0
        // also update the prCtxtsTestsResultsMatrix
        resultStr = "test " + ${testId + 1} + " on entity " + c[i][c[i].indexOf("name") + 1];   // t1, etc +
        this.prCtxtResultRow[0].push(resultStr);
        // TODO - [ ] - later consider the option of multiple entities test passes in the same context 
        n++;
      }
    }
  `;
  return testFunction;
}

// nTests() - includes in the rnaCode all the test scripts (from prTestArray) to be run on the current context
// the test scripts are those generated above in the nBasicTestsCoder() - 
// for now - test scripts will put the passed test result strings in the prTestArray starting with cell rTestArray[t][10 + n]
function nTests(testArray: any[][]):string {
  let testScripts: string = `
  // Run all project tests on the current context n[] - as coded in nBasicTestsCoder()
  // Test results will be in the Project Tests Array prTestArray[test][10 + nrResult]
  // TODO - [ ] - Add option for successive / integration / e2e testing on the same context
  this.prCtxtResultRow = [];  
  // TODO - [ ] - add in testsRow below logging data, time, branch, step, etc
  let testsRow = ["ctxtId", this.currentContextId,"passed"];
  this.prCtxtResultRow.push(testsRow);
  `;
  for ( let t = 0; t<testArray.length; t++) {
    testScripts += `{
      // Project Test script ${t+1}
      ${testArray[t][9]}
    } // END Project Test script ${t+1}`;
  }
  testScripts += `
  // Add all test results of the context to the project Contexts Test Results Matrix
  this.prCtxtsTestsResultsMatrix.push(this.prCtxtResultRow);
  `;
  testScripts += l;
  return testScripts;
}

// qNames() array of the names in the q context
function qNames() {
  let qNamesFunction: string = `
    let qN = this.q.slice();
    let names = [];
    this.qNamesArray = [];
    for (let i = 1; i < qN.length; i++) {
      names.push(qN[i][5]);    // name eg: Jar5L is the  6th element of the entity row in a context array
    }
    this.qNamesArray = names;
  `;
  return qNamesFunction;
}

// To allow testing for unique entities / with unique names
function qOthers() {
  let qOthersFunction: string = `
    let qNArray = this.qNamesArray.slice();
    let others = [];
    this.qOtherNames = [];
    for (let i = 0; i < qNArray.length; i++) {
      let qNA = qNArray.slice();
      qNA.splice(i,1);
      let joinedNames = '';
      joinedNames = qNA.join('|');
      others.push(joinedNames) ;    // name eg: Jar5L is the  6th element of the entity row in a context array
    }
    this.qOtherNames = others;
  `;
  return qOthersFunction;
}

// nBasicQueriesCoder() - Generates the query/conditional codes to be included in the && structure of the Input Query
// to be evaluated after a ToDo context is copied/slice into the q context
// Each opInputArraay will get in its 9 element a string representing its query conditions:
// There will be 2 parts of this string:
// 1. To ensure a unique name / entity (equivalent to entity.name not matching itself in the overall query)
// like ( q[i][q[i].indexOf("name") + 1] != q[j][q[j].indexOf("name") + 1] ) 
// 2. A conditional representing the property condition of the line:
// like ( q[i][q[i].indexOf(conditionalValue[0]) + 1] > conditionalValue[1])
// to use the q[][] array of the context to query
// based on line 472 in the dnas.js which is included in the body of the nested for loops (see below nForHeader()):
// if ( ( q[i][q[i].indexOf("name") + 1] != q[j][q[j].indexOf("name") + 1] ) && 
// (q[i][q[i].indexOf(conditionalValue[0]) + 1] > conditionalValue[1]) && 
// (q[j][q[j].indexOf(conditionalValue[2]) + 1] > conditionalValue[3]) ) {
// -- for name unicity / difference we'll use:
//   !(qOtherNames[<s>].includes(q[i<s>][5])  
// To include a closing bracket } in the core DNA nGene
function nBasicQueryCoder(qEntNo: number, entType: string, propName: string, condition: string, propVal: string ): string {
  let queryCoder: string = `( !( this.qOtherNames[i${qEntNo} - 1].includes(this.q[i${qEntNo}][5]) ) && (( this.q[i${qEntNo}][3] == '${entType}' ) && ( this.q[i${qEntNo}][this.q[i${qEntNo}].indexOf('${propName}' ) + 1] ${condition} ${propVal} ) ) )`;
  return queryCoder;
}

// nBasicArgCoder() - Generates the argument code to be included in the rnaCode string
// TODO - [ ] - expand to include multiple arguments not just those in the opInputArray
// It should produce an output similar to dnas.js line: 518
// var serviceFunction = pour( n[i][n[i].indexOf(functionInput[0]) + 1], n[j][n[j].indexOf(functionInput[1]) + 1]);
function nBasicArgCoder(qEntNo: number, propName: string): string {
  let argCode: string = `this.n[i${qEntNo}][this.n[i${qEntNo}].indexOf('${propName}') + 1]`;
  return argCode;
}

// nForStepResults() - Generates the code rna code for calculating the service functions results
// similar to dnas.js line 518:
// var serviceFunction = pour( n[i][n[i].indexOf(functionInput[0]) + 1], n[j][n[j].indexOf(functionInput[1]) + 1]);
function nForStepResults(opStepsCodes: string[]): string {
  let nForResult = `
    // Calculations for the results of the function for each step of operation`;
  for (let step = 0; step < opStepsCodes.length; step++) {
    nForResult += `
    this.stepResults[${step}] = ${opStepsCodes[step]};\n`; 
  }
  nForResult += l;
  return nForResult;
}

// nForStepResults() - Generates the rna code for calculating the service functions results
// similar to dnas.js line 518:
// var serviceFunction = pour( n[i][n[i].indexOf(functionInput[0]) + 1], n[j][n[j].indexOf(functionInput[1]) + 1]);
function nForStepUpdates(opUpdatesCodes: string[]): string {
  let nForUpdate = `
    // The code for updating the changed propeties for each entity for after each step result calculation `;
  for (let update = 0; update < opUpdatesCodes.length; update++) {
    nForUpdate += `
    ${opUpdatesCodes[update]}`; 
  }
  nForUpdate += l;
  return nForUpdate;
}

// nForTxExpression() - Generates the rna code for assigning context values to the Parts of Speech 
// PoS that will be used later to generate a natural language sentence as a transformation/task command, description, etc
// similar to dnas.js line 531-532:
// problemChangeEntity1Name = n[i][n[i].indexOf(serviceChangeEntity1[2]) + 1];
// problemChangeEntity2Name = n[j][n[j].indexOf(serviceChangeEntity2[2]) + 1];
function nForTxExpression(opPartsOfSpeech: string[]): string {
  let nForExpression = `
    // The code for getting the Parts of Speech Values from the context 
    this.txExpression.clear(); `;
  for (let pos = 0; pos < opPartsOfSpeech.length / 2; pos++) {
    nForExpression += `
    this.txExpression.set('${opPartsOfSpeech[2*pos]}', ${opPartsOfSpeech[2*pos + 1]});`; 
  }
  nForExpression += l;
  return nForExpression;
}

// nForHeader() - Generates header for an n level nested for loop - for multi entities/dimensional join/queries
// indexes will look like i1, i2, ... equivalent to i, j, k indexes in regular nested loops, etc
// For now all index, start, compare, stop, increment will be the same for all for all generated loops
// Future implementations could include matrices for these arguments
// TODO - [ ] to add a pre-indent string for formatting
function nForHeader(n: number, indent: string, index: string, start: number, compare: string, stop: number, increment: string): string {
  let nForHeader = '';
  for ( let i = 1; i <= n; i++) {
    const forStatement = `for ( let ${index}${i} = ${start}; ${index}${i} ${compare} ${stop} ; ${index}${i}${increment} ) {
${indent}`;
    nForHeader += forStatement;
  }
  return nForHeader;
} 

// nQuery2IfHeader() - for now 2 arguments for the 2 entities in demo
// TODO - [ ] - add either a switch by nr args or try some args array option?
function nQuery2IfHeader(indent: string, arg1: string, arg2: string): string {
  let nQuery = indent + `if ( ${arg1} && ${arg2} ) `;

  nQuery += ' { \n';
  return nQuery;
}

// nQuery2IfFooter() - Returns the closing bracket for the nQHeader() if() statement
// TODO - [X] to add a pre-indent string for formatting
function nQuery2IfFooter(indent: string): string {
  let nQFooter = `
  this.ctxtId++;
  this.branch++;
  this.previousContextId = this.currentContextId;
  ${indent}}
  this.rowId++; // For nGene Dev`;
  return nQFooter;
}

// nForFooter() - Retruns the footer of a compact nFor Statement
// TODO - [ ] to add a pre-indent string for formatting
function nForFooter(n: number, indent: string): string {
  let nForFooter = '';
  let footer = '}';
  // Generate the first footer line eg ith 3 tag/indents: "         }"
  for ( let i = 1; i <= n ; i++) {
      footer = indent + footer;
  }
  for ( let i = 1; i <= n ;  i++) {
      nForFooter += l;
      let shorterFooter = footer.substring(indent.length, footer.length);
      footer = shorterFooter;
      nForFooter += footer;
  }
  return nForFooter;
}

// export all helper functions
export { nBasicTestsCoder, nTests, qNames, qOthers, nBasicQueryCoder, nBasicArgCoder, nForStepResults, nForStepUpdates, nForTxExpression, nForHeader, nQuery2IfHeader, nQuery2IfFooter, nForFooter };
