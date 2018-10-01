// Dynamic Natural Activation Algorithm - Functional body parts
// Copyright Ianta Labs / MIT license

const newLine = `
`;

// Generate an n level nested for loop - for multi entities/dimensional join/queries
// indexes will have a default const indexBase iB
// For now all index, start, compare, stop, increment will be the same for all for all generated loops
// Future implementations could include matrices for these arguments
function nForHeader(n: number, indent: string, index: string, start: number, compare: string, stop: string, increment: string): string {
  let nForHeader = '';
  const iB = 'n';
  for ( let i = 1; i <= n; i++) {
      const forStatement = `for ( let ${iB + index}${i} = ${start}; ${iB + index}${i} ${compare} ${stop} ; ${iB + index}${i}${increment} ) {
${indent}`;
      nForHeader += forStatement;
  }
  return nForHeader;
} 

// Retrun the footer of a compact nFor Statement
function nForFooter(n: number, indent: string) {
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

// export all helper functions
export { nForHeader, nForFooter };