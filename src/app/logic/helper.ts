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

    // When copying from GSheets last element is always a pipe or blank from the split operation above
    if (cleanStr[cleanStr.length - 1] == '') {
        cleanStr.pop();
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
function hashCode(s: string): number {
    var h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
  };

// export all helper functions
export { rn, lines, pipes, tokens, hashCode };