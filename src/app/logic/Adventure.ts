import { Plan}  from "../project/plan.model";
import { Talent } from "../skill/talent.model";
import { Context } from "./Context";
import { Problem } from "./Problem";
import { Operation } from "./Operation";
import { VentureService } from "../venture/venture.service";
import { CurrentVentureComponent } from "../venture/current-venture/current-venture.component";
import * as ops from "../logic/helper";
import { LoggerService } from "./logger.service";

export class Adventure {

    // ventureService: VentureService;

    problem: Problem;

    operation: Operation;
    // operations: Array<Operation>

    dbProject: Plan;

    dbServices: Array<Talent>;

    // contexts: Array<Context> = [];

    // Constructor for the case of one service/function/operator to be apply for the problem
    // TODO - extend constructor for Array of services relevant(by tags) to project 
    constructor(
        private ventureService: VentureService, 
        name: string,
        duration: number,
        cost: number,
        startScript: string,
        checkScript: string,
        inputScript: string,
        changeScript: string,
        outputScript: string
    ) {
        // First Generate a Plan via the Problem Solver
        this.problem = new Problem(startScript, checkScript);

        this.operation = new Operation(inputScript, changeScript, outputScript);

        // TODO - [ ] Find how to link the algo to the Venture Component: ?in venture.service?
        // ToDo :      

        this.ventureService.getUpdates({
            id: 2,
            name: '[Adventure]', 
            message: 'Problem & Operation ', 
            state: 'Constructed'});

    }
}