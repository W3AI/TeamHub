export interface Task {
    id: string;
    name: string;       // the text of a task in a project plan
    duration?: number;
    calories?: number;   // actual energy burnt
    actualCost?: number;       // actual spent cost
    costCurrency?: string;
    provider?: string;  // name of service provider for the task - Who executes the task: self | own script/service | 3rd party service provider
    providerId?: string;
    providerRate?: number;   // rate per unit of time
    providerUnitOfTime?: string; // sec | min | hour | day | week | ...
    providerCurrency?: string;  // USD, CAD, EUR, Bitcoin, etc - should use a currency standard
    date?: Date;
    start?: Date;       // Start Date/time of the task
    end?: Date;         // End/Finish Date/time of the task
    state?: 'completed' | 'cancelled' | null;
}