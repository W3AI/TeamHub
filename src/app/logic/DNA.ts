// Dynamic Natural Activation Algorithm - Functional body parts
// Copyright Ianta Labs / MIT license

const newLine = `
`;
const iB = 'n';   // index Base

// nForHeader() - Generate header for an n level nested for loop - for multi entities/dimensional join/queries
// indexes will have a default const indexBase iB
// For now all index, start, compare, stop, increment will be the same for all for all generated loops
// Future implementations could include matrices for these arguments
// TODO - [ ] to add a pre-indent string for formatting
function nForHeader(n: number, indent: string, index: string, start: number, compare: string, stop: string, increment: string): string {
  let nForHeader = '';
  for ( let i = 1; i <= n; i++) {
    const forStatement = `for ( let ${iB + index}${i} = ${start}; ${iB + index}${i} ${compare} ${stop} ; ${iB + index}${i}${increment} ) {
${indent}`;
    nForHeader += forStatement;
  }
  return nForHeader;
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
      nForFooter += newLine;
      let shorterFooter = footer.substring(indent.length, footer.length);
      footer = shorterFooter;
      nForFooter += footer;
  }
  return nForFooter;
}

// nQHeader - Generates the if() statment equivalent to querying a Join table built(structured) with nForHeader 
// for querying n entities/with 1 property TODO - [ ] - to consider expanding to an arbitrary number of properties for each entity - as from operation inputRows[] in edit-session / demo
// TODO - [ ] to add a pre-indent string for formatting
// q must be initialized previously as multi-dimensional array with dimensions = nr entities in the Join table = 
// number of inputRows for the operation
// indexes for the q array must be the same as the index of the nForHeader ie ni1, ni2, ... built there as ${iB + index}${i} 
// Sample below from dnas.js / Flipper Project Apr 2018
// if ( ( q[i][q[i].indexOf("name") + 1] != q[j][q[j].indexOf("name") + 1] ) && (q[i][q[i].indexOf(conditionalValue[0]) + 1] > conditionalValue[1]) && (q[j][q[j].indexOf(conditionalValue[2]) + 1] > conditionalValue[3]) ) {

function nQHeader(n: number, index: string, ): string {
  // TODO - [ ] - add first the condition of different entities
  // ( q[i][q[i].indexOf("name") + 1] != q[j][q[j].indexOf("name") + 1] )
  // TODO - [ ] - how to check difference / unique for n > 2 ? => some kind of combinatorics of pairs?
  // difference is important only if querying entities of the same type ...
  // We could have different type of queries generated:
  // 1 - on several entities of the same type
  // 2 -  multiple entities of unique types
  // 3 - some combination
  // for now we should implement only for 2 ent of same type and unique entities with 1 or multiple properties
  let nQHeader = ` ( q[i][q[i].indexOf("name") + 1] != q[j][q[j].indexOf("name") + 1] ) `;

  for ( let i = 1; i <= n;  i++) {
    const qHeader = `( ( q[${iB + index}${i}] ) ) ... TO BE CONTINUED ... Sep 30 2018 ...`;
    nQHeader += qHeader;
  }

  return nQHeader;
}

// nQFooter() - Returns the closing bracket for the nQHeader() if() statement
// TODO - [ ] to add a pre-indent string for formatting
function nQFooter(): string {
  let nQFooter = '}';
  return nQFooter;
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
export { nForHeader, nForFooter };