// Helper functions

// Generate Random Number between 0 and max
function rn(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
} 

// To split a multi line string/script from db in separate lines
function lines(str: string): Array<string> {
    return str.split('\n');
}

// Replace non printable characters with a pipe '|'
function pipes(str: string): string {
    return str.replace(/[^ -~]+/g, '|');
}

// Split string into token strings
function tokens(str: string): Array<string> {
    return str.split('|');
}

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

    // nForFooter = footer;

    const newLine = `
`;

    for ( let i = 1; i <= n ;  i++) {
        nForFooter += newLine;

        let shorterFooter = footer.substring(indent.length, footer.length);
        footer = shorterFooter;

        nForFooter += footer;
    }

    return nForFooter;
}

// export all helper functions
export { rn, lines, pipes, tokens, nForHeader, nForFooter };