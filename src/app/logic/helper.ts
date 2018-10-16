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
//    return str.replace(/[^ -~]+/g, '|');
    return str.replace(/[	]+/g, '|');     // replace the tabs with pipe
}

// Split string into token strings
function tokens(str: string): Array<any> {
    let cleanStr: string[] = [];
    let array: any[] = [];
    if (str.includes('|')) {
      cleanStr = str.split('|');  
    } else {
      cleanStr =  str.split(' ');
    }
    
    for ( let element of cleanStr ) {
        let numeric = Number(element);
        if ( isNaN( numeric ) ) {
            array.push(element);
        } else {
            array.push(numeric);
        }
    }
    return array;
}

// export all helper functions
export { rn, lines, pipes, tokens };