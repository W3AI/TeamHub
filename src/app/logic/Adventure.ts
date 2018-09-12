import { Plan } from "../project/plan.model";
import { Talent } from "../skill/talent.model";
import { Context } from "./Context";

export class Adventure {
    dbProject: Plan;
    dbServices: Array<Talent>;

    contexts: Array<Context>;

    constructor() {

        // Initialize dbProject with selected project from db

        // Initialize dbServices with selected services from db

        console.log('Servus from the Adventure constructor');
    }
}