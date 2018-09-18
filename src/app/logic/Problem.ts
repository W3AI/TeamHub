import { Context } from "./Context";
import { TestList } from "./TestList";
import { Solution } from "./Solution";



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

  contexts: Array<Context>

  testList: TestList;

  solutionList: Set<Solution>;

}