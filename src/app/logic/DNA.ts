// Dynamic Natural Activation Algorithm - Functional body parts
// Copyright Ianta Labs / MIT license

const l = '\n';
const iB = 'n';   // index Base: ni0, ni1, ni2 ...

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
function nBasicTestsCoder(entType: string, propName: string, condition: string, propVal: string ): string {
  let testFunction: string = `
    let c = this.c.slice();
    let result = [];
    let n = 0;  // Number of results
    for (var i = 1; i < c.length; i++) {
      if ( ( c[i][c[i].indexOf("type") + 1] == '${entType}' ) & ( c[i][c[i].indexOf('${propName}') + 1] ${condition} ${propVal} )) {
        result[n] = ["contextId", c[0][1], "step", c[0][c[0].indexOf("step") + 1], "branch", c[0][c[0].indexOf("branch") + 1], "entityId", i, "entType", "${entType}", "${propName}", ${propVal}];
        this.prTestArray[t][10 + n] = result[n];  // 10 is the next available index
        n++;
      }
    }
  `;
  return testFunction;
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
//   !(qOtherNames[<s>].includes(q[ni<s>][5])  
// To include a closing bracket } in the core DNA nGene
function nBasicQueryCoder(qEntNo: number, entType: string, propName: string, condition: string, propVal: string ): string {
  let queryCoder: string = `( !( this.qOtherNames[ni${qEntNo} - 1].includes(this.q[ni${qEntNo}][5]) ) && (( this.q[ni${qEntNo}][3] == '${entType}' ) && ( this.q[ni${qEntNo}][this.q[ni${qEntNo}].indexOf('${propName}' ) + 1] ${condition} ${propVal} ) ) )`;
  return queryCoder;
}

// nBasicArgCoder() - Generates the argument code to be included in the rnaCode string
// TODO - [ ] - expand to include multiple arguments not just those in the opInputArray
// It should produce an output similar to dnas.js line: 518
// var serviceFunction = pour( n[i][n[i].indexOf(functionInput[0]) + 1], n[j][n[j].indexOf(functionInput[1]) + 1]);
function nBasicArgCoder(qEntNo: number, entType: string, propName: string, condition: string, propVal: string ): string {
  let argCode: string = `( [ni${qEntNo}] )`;
  return argCode;
}

// nForHeader() - Generates header for an n level nested for loop - for multi entities/dimensional join/queries
// indexes will have a default const indexBase iB
// For now all index, start, compare, stop, increment will be the same for all for all generated loops
// Future implementations could include matrices for these arguments
// TODO - [ ] to add a pre-indent string for formatting
function nForHeader(n: number, indent: string, index: string, start: number, compare: string, stop: number, increment: string): string {
  let nForHeader = '';
  for ( let i = 1; i <= n; i++) {
    const forStatement = `for ( let ${iB + index}${i} = ${start}; ${iB + index}${i} ${compare} ${stop} ; ${iB + index}${i}${increment} ) {
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

// nQueryIfFooter() - Returns the closing bracket for the nQHeader() if() statement
// TODO - [ ] to add a pre-indent string for formatting
function nQueryIfFooter(): string {
  let nQFooter = '}';
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


// Build the Operation/Service string function to evaluate and assign to intermediary var
// eg: bellow line 518 from dnas.js
// var serviceFunction = pour( n[i][n[i].indexOf(functionInput[0]) + 1], n[j][n[j].indexOf(functionInput[1]) + 1]);
function nFunctions(): Array<string> {
  let nFunction: string[] = [];

  return nFunction;
}

// n Update Query/Script string
function nUpdates(): Array<string> {
  let nUpdates: string[] = [];

  return nUpdates;
}

// export all helper functions
export { nBasicTestsCoder, qNames, qOthers, nBasicQueryCoder, nBasicArgCoder, nForHeader, nQuery2IfHeader, nQueryIfFooter, nForFooter };