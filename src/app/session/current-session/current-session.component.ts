import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-session',
  templateUrl: './current-session.component.html',
  styleUrls: ['./current-session.component.css']
})
export class CurrentSessionComponent implements OnInit {
  defaultProject = `Title	5 Cell Graph				5细胞格拉夫		5 सेल ग्राफ़		5 خلية الرسم البياني		5 Cell Graph		5 Сотовый график		5 celular Gráfico		5 Cell Graph			
  Description	Generate Neo4j Cypher queries for the 5 Cell solution to the problem: Make 10 equilateral triangles, all of the same size, using 10 matchsticks, where each side of every triangle is exactly one matchstick. No solution exists in three dimensions.																			
  Tags	create Neo4j lines																			
  INPUT	1	5																		
    Cell	,	name	:	C1															
    Cell	,	name	:	C2															
    Cell	,	name	:	C3															
    Cell	,	name	:	C4															
    Cell	,	name	:	C5															
                                          
  Solution	?	1																		
                                          
  OUTPUT	1	1																		
    Cell	,	name	:	ALL	,	lines	==	10											
                                          
  T&C	3	3																		
    ccy	,	name	:	CAD	,	dollar	:	1	,	seconds	:	60							
  English	EN	,	noun	:	Cell	,	name	:	C1	,	label	:	type							
  Chinese	ZH	,	名词	:	细胞	,	名称	:	C1	,	标签	:	类型							`;

  defaultOperation = `Title	Build Relation				建立关系		बिल्ड रिलेशन		بناء العلاقات		construir Relación		построить Relation		construir Relação		Construiți Relația			
  Description	Create relationship script for Neo4j																			
  Tags	create, link, neo4j, cypher																			
  INPUT	1	2																		
    Node	,	name	:	a															
    Node	,	name	:	b															
                                          
  Script	1	1																		
    string	,	name	: 	createRel	, 	language	:	Cypher	, 	expression	:	query.concat ( 'CREATE (', a, ')-[R:line]->(',  b, ')' )							
                                          
  OUTPUT	1	2																		
    Script	,	name	:	createRel	,	query	:	expression											
                                          
                                          
  T&C	6	6																		
    ccy	,	name	:	CAD	,	dollar	:	0.01	,	seconds	:	2							
  English	EN	,	noun	:	Node	,	name	:	a	,	label	:	type	, 	query	: 	CREATE (n)			
  English	EN	,	verb	:	create	,	expression	:	CREATE (a)-[Rel:line]->(b)											
  Chinese	ZH	,	名词	:	节点	,	名称	:	a	,	标签	:	类型	,	询问	:	CREATE (n)			
  Chinese	ZH	,	动词	:	创建	,	表达	:	CREATE (a)-[Rel:line]->(b)											`;

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
