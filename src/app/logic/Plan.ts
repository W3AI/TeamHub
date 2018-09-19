class Task {
    name: string;
    operation: string;
}

export class Plan {
    name: string;   // this could be the string/graph of sequence of tasks
    duration: number;
    cost: number;

    tasks: Array<Task>;
}

export class Schedule {

}
