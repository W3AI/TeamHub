import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {
  
  // TODO - [ ] Change oddNumbers[] to Problem Class structures:
  // ContextsScripts[]
  // SolutionScripts[] 
  // TestScripts[]
  oddNumbers: number[] = [];

  // TODO - [ ] Change evenNumbers[] to Operation Class structures:
  // InputScripts[]
  // OperationScripts[] 
  // OutputScripts[]
  evenNumbers: number[] = [];

  constructor() { }

  ngOnInit() {
  }

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }

}
