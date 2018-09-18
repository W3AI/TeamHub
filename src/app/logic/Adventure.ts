import { Plan } from "../project/plan.model";
import { Talent } from "../skill/talent.model";
import { Context } from "./Context";
import { VentureService } from "../venture/venture.service";
import * as ops from "../logic/helper";

export class Adventure {

    private ventureService: VentureService;

    dbProject: Plan;

    dbServices: Array<Talent>;

    contexts: Array<Context> = [];

    // Constrictor for the case of one service/function/operator to be apply for the problem
    // TODO - extend constructor for Array of services relevant(by tags) to project 
    constructor(
        name: string,
        duration: number,
        cost: number,
        startScript: string,
        checkScript: string,
        inputScript: string,
        changeScript: string,
        outputScript: string
    ) {

        console.log('Servus from the Adventure constructor');

        // console.log(name);
        // console.log(duration);
        // console.log(cost);

        console.log(startScript);

        this.contexts[0].dbLines = ops.lines(startScript);
        

        // console.log(checkScript);
        // console.log(inputScript);
        // console.log(changeScript);
        // console.log(outputScript);

        // Initialize dbProject with selected project from db

        // Initialize dbServices with selected services from db
    
        // TODO - Check implementation of Iterators and Generators in TS

    }
}