import { TestList, Test } from "./TestList";
import { Context, Entity, Property } from "./Context";
import { Plan, Schedule } from "./Plan";

export class Solution {
    plan: Plan;
}

// Ideas should bee the root for a 
// template plan / list of steps/ops
class Idea {
    name: string;
    description: string;

    created: Date;
    url: string;
}

class Milestone {
    name: string;
    date: Date;
}

class Project extends Solution {
    budget: number;
    budgeted: Date;     // Date when the problem/opportunity was budgeted
    timeframe: Date;    // period of time for availability of budget

    milestones: Array<Milestone>; 

    plans: Array<Schedule>;
}
