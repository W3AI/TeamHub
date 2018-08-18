export interface Task {
    id: string;
    name: string;       // the text of a task in a project plan
    duration?: number;
    calories?: number;   // actual energy burnt
    cost?: number;       // actual spent cost
    date?: Date;
    start?: Date;       // Start Date/time of the task
    end?: Date;         // End/Finish Date/time of the task
    state?: 'completed' | 'cancelled' | null;
}