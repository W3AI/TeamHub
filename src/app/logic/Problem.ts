import { Context } from "./Context";
import { TestList } from "./TestList";
import { Solution } from "./Solution";
import * as ops from "../logic/helper";



export class Problem {
  // Problem class is similar to Project - might merge if possible 
  name: string;
  timeframe: number;
  budget: number;
  votes: number;

  updated: Date; // Date when updated from Idea to Problem
  input: string;
  output: string;

  initialContext: Context;
  contextRows: Array<string>;

  contexts: Array<Context>

  testList: TestList;
  testRows: Array<string>;

  solutionList: Set<Solution>;

  constructor(startScript: string, checkScript: string) {

    console.log('Servus from the Problem constructor');

    // Initialize Problem Context
    this.contextRows = ops.lines(startScript);
    this.initialContext = new Context();
    this.initialContext.metaData = ops.pipes(this.contextRows[0]);
    console.log(this.initialContext.metaData);

    // Initialize Test List
    this.testRows = ops.lines(checkScript);
    this.testList = new TestList();
    this.testList.metaData = ops.pipes(this.testRows[0]);
    console.log(this.testList.metaData);

  }

}