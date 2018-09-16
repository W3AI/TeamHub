import { Plan } from "../project/plan.model";
import { Talent } from "../skill/talent.model";
import { Context } from "./Context";
import { VentureService } from "../venture/venture.service";


// let array = [1, 2, 3, 4];

// array[Symbol.iterator] = function () {
//     let nextValue = 10;
//     return {
//         next: function () {
//             nextValue++;
//             return {
//                 done: nextValue > 15 ? true : false,
//                 value: nextValue
//             };
//         }
//     };
// }

function *gen(end) {
    for (let i = 0; i < end; i++) {
        try {
            yield i;
        } catch (e) {
            console.log(e);
        }
    }
}

let it = gen(2);

export class Adventure {

    private ventureService: VentureService;

    dbProject: Plan;
    dbServices: Array<Talent>;

    contexts: Array<Context>;

    constructor() {

        // Initialize dbProject with selected project from db

        // Initialize dbServices with selected services from db

        console.log('Servus from the Adventure constructor');
    
        // TODO - Check implementation of Iterators and Generators in TS

        console.log(it.next());
        console.log(it.return('An error occured'));
        console.log(it.next());
        console.log(it.next());

        // console.log(this.ventureService.getProject(0));

    }
}