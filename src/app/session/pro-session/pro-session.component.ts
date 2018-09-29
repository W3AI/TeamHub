import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pro-session',
  templateUrl: './pro-session.component.html',
  styleUrls: ['./pro-session.component.css']
})
export class ProSessionComponent implements OnInit {
  defaultProject = `Distributing Innovation Sauce
  tags : content
  INPUT	3 Terms:CAD, cent:10, secs:60
  Jar, n:Jar3L, vol:3, content:0, available:3
  Jar, n:Jar5L, vol:5, content:0, available:5
  Jar, n:Jar8L, vol:8, content:8, available:0
                                  
  SOLUTIONS 1
  
  OUTPUT 1
  Jar	WITH content = 4`;

  defaultOperation = `Top Innovation Sauce
tags : content
INPUT 2 Terms:CAD, cent:1, secs:2
Jar	1	n:fromJar,	content>0				
Jar	2	n:toJar,	available>0				
                          
FUNCTIONS 1
poured=MIN(fromJar.content,toJar.available)
                          
OUTPUT 2
fromJar.content-=poured,available+=poured				
toJar.content+=poured,available-=poured`;

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
