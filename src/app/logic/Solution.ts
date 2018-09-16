import { TestList, Test } from "./TestList";
import { Context, Entity, Property } from "./Context";
import { Plan, Schedule } from "./Plan";

class Idea {
    name: string;
    description: string;

    created: Date;
    url: string;
}

class Problem extends Idea {
    updated: Date; // Date when updated from Idea to Problem
    input: string;
    output: string;

    context: Context;

    testList: TestList;
}

class Milestone {
    name: string;
    date: Date;
}

class Project extends Problem {
    budget: number;
    budgeted: Date;     // Date when the problem/opportunity was budgeted
    timeframe: Date;    // period of time for availability of budget

    milestones: Array<Milestone>; 

    plans: Array<Schedule>;
}
