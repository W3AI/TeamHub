// TODO - To modify/adapt from Task model to Plan Model - under Project domain name

export interface Plan {
    id: string;
    name: string;
    tags: string;
    privacy: 'private' | 'family' | 'friends' | 'business' | 'public';
    startScript?: string;
    checkScript?: string;
    ownerId?: string;
    ownerEmail?: string;
    ownerDisplayName: string;
    description?: string;
    url?: string;
    duration?: number;
    budget?: number;
    date?: Date;
    state?: 'in preparation' | 'in progress' | 'completed' | 'cancelled' | null;
    actualCost?: number;       // actual spent cost - TODO - to review from here
    costCurrency?: string;
    providerName?: string;  // name of service provider for the task - Who executes the task: self | own script/service | 3rd party service provider
    providerId?: string;
    providerEmail?: string;
    providerTaskCommandFormat?: string;  // the expected format of the command to execute task
    providerIndustry?: string; // Domain / Industry
    providerCountry?: string;   // Country of the provider - for taxation, etc
    providerProvince?: string;  // Province of the provider - for taxation, etc
    provderOrganization?: string;   // Corporation, SupraUnit - for corp rate, taxation, etc
    providerURL?: string;   // link to the provider UGE formatted site with terms, etc 
    providerType?: string;  // Manual | Scripted | Autopilot | web/cloud service | local microservice ...
    providerCalendarURL?: string; //  URL of the Provider calendar where task can be booked
    providerToDoListURL?: string;   // URL of the ToDo List of the provider
    providerEstimatedDelayToStart?: string; // number+ms|sec|min|hours , etc or Daily, hourly, etc
    prviderEstimatedDelayToConfirmCompletion?: string; // message response immediatelly after completion or secs/mins/hours batch confirmations, etc
    providerEstimatedSpeedPerUnitOfWork?: string; // number of units of work per ms|sec|min|hours , etc  
    providerRate?: number;   // rate per unit of time
    providerUnitOfTime?: string; // sec | min | hour | day | week | ...
    providerCurrency?: string;  // USD, CAD, EUR, Bitcoin, etc - should use a currency standard
    startTime?: Date;       // Start Date/time of the task
    finisTime?: Date;         // End/Finish Date/time of the task
}