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
    if (str.includes('|')) {
      return str.split('|');  
    } else {
      return str.split(' ');
    }
    
}

// export all helper functions
export { rn, lines, pipes, tokens };