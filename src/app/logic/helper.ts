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

// /** https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
//  * Returns a hash code for a string.
//  * (Compatible to Java's String.hashCode())
//  *
//  * The hash code for a string object is computed as
//  *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
//  * using number arithmetic, where s[i] is the i th character
//  * of the given string, n is the length of the string,
//  * and ^ indicates exponentiation.
//  * (The hash value of the empty string is zero.)
//  *
//  * @param {string} s a string
//  * @return {number} a hash code value for the given string.
//  */
// function hashCode(s: string): number {
//     var h = 0, l = s.length, i = 0;
//     if ( l > 0 )
//       while (i < l)
//         h = (h << 5) - h + s.charCodeAt(i++) | 0;
//     return h;
//   };

  function buildTableHeader(tableId: string, array: any[]) {
    let table = <HTMLTableElement>document.getElementById(tableId);
    // console.log('-- Header Table Id: ' + tableId);
    // console.log('-- table: ' + table);

    let header = table.createTHead();
    let row = table.insertRow(0);

    let l = array.length;
    let cell = [];

    for (let i = 0; i < l; i++) {
      cell[i] = row.insertCell(i);
      cell[i].innerHTML = array[i];
    }
}

function addTableRow(tableId: string, contextId: number, array: any[]) {
    let table = <HTMLTableElement> document.getElementById(tableId);
    let row = table.insertRow(1);
    // row.className = "c" + contextId + " " + "b" + branchId;
    row.className = "t" + Date.now() + " "+ "c" + contextId;

    let l = array.length;
    let cell = [];

    for (let i = 0; i < l; i++) {
      cell[i] = row.insertCell(i);
      cell[i].innerHTML = array[i];
    }
}

function addContextToMemoryTable(tableId: string, contextId: number, contextArray: any[]) {
    for( let i = 0; i < contextArray.length; i++) {
        addTableRow(tableId, contextId, contextArray[i]);
    }
  }

// TODO - To replace with Angular string interpolation
  function updateNodesNo(nodesNo) {
    // Update nodes Number in the "memory" table header row
    var displayNodes = document.getElementById("nodeIndex");
    displayNodes.innerHTML = nodesNo;
  }
  
// TODO - To replace with Angular string interpolation
function updateTxNo(txNo) {
    // Update transaction Number in the "memory" table header row
    var displayNodes = document.getElementById("txIndex");
    displayNodes.innerHTML = txNo;
  }

// DNA editor functions from the Flipper project: flipper/webroot/js/dna-editor.js

// TODO - check table/rows/cells length, etc
function readCell(tableId: string, row: number, col: number): any {
    let table = <HTMLTableElement> document.getElementById(tableId);
    let x = table.rows[row].cells;
    let value = x[col].innerHTML;
    return value;
}

// TODO - check table/rows/cells length, etc
function setCell(tableId: string, row: number, col: number, value: any) {
    let table = <HTMLTableElement> document.getElementById(tableId);
    let x = table.rows[row].cells;
    console.log('Investor table row: ');
    console.log(x);
    console.log('Investor table cell: ');
    console.log(x[col].innerHTML);
    console.log('Function passed value: ');
    console.log(value);
    x[col].innerHTML = value;
}

// TODO - check table/rows/cells length, etc
function readTableInArray(tableId: string) {
    let table = <HTMLTableElement> document.getElementById(tableId);
    let tableRows = table.rows;
    // console.log(" Rows #: " + tableRows.length);
    let tableArray = [];

    for (let rowId = 0; rowId < tableRows.length; rowId++) {
      let rowCells = table.rows[rowId].cells;
      // console.log(table + " Cells in Row " + rowId + " : " + rowCells.length);
      tableArray.push([]);
      for (let colId = 0; colId < rowCells.length; colId++) {
        if (rowCells[colId].innerHTML != "<br>") {
          tableArray[rowId][colId] = rowCells[colId].innerHTML;
        } else {
          // TODO - Check "" and " "
          tableArray[rowId][colId] = " ";
        }
      }
    }
    return tableArray;
}

// export all helper functions
export { rn, lines, pipes, tokens, buildTableHeader, addTableRow, addContextToMemoryTable, updateNodesNo, updateTxNo, readCell, setCell, readTableInArray };
