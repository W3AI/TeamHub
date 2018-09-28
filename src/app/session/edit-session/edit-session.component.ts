import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {
  defaultProject = `INPUT	3	Terms	:	CAD	,	cent	:	10	,	Seconds	:	60				
  Jar	,	name	:	Jar3L	,	volume	:	3	,	content	:	0	,	available	 = 	3
  Jar	,	name	:	Jar5L	,	volume	:	5	,	content	:	0	,	available	 = 	5
  Jar	,	name	:	Jar8L	,	volume	:	8	,	content	:	8	,	available	 = 	0
                                  
  SOLUTIONS   1
  
  OUTPUT	1
  Jar				WITH		content	 = 	4`;

  defaultOperation = `INPUT	2	Terms	:	CAD	,	cent	:	1	, 	Seconds	:	2
  Jar	1	name	:	from_Jar	,	content	>	0				
  Jar	2	name	:	to_Jar	,	available	>	0				
                          
  FUNCTIONS		1										
  poured	 = 	MIN	(	from_Jar	.	content	,	to_Jar	.	available	)	
                          
  OUTPUT	2											
  from_Jar	.	content	-=	poured	,	available	 +=	poured				
  to_Jar	.	content	 +=	poured	,	available	-=	poured				`;


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
