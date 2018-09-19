import * as ops from "../logic/helper";

export class Operation {
  name: string;
  duration: number;
  energy: number;

  inputScript: string;
  inputRows: Array<string>;

  changeScript: string;
  changeRows: Array<string>;

  outputScript: string;
  outputRows: Array<string>;

  constructor(
    inputScript: string, 
    changeScript: string,
    outputScript: string) 
  {
    console.log('Servus from the Operation constructor');

    // Initialize Input Query
    this.inputRows = ops.lines(inputScript);

    // Initialize Function/Change/Transformation code
    this.changeRows = ops.lines(changeScript);

    // Initialize Output Query
    this.outputRows = ops.lines(outputScript);
  }
}