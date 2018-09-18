export class Property {
    name: string;
    value: any;
    unit: string;       // unit of measure for value
    created: Date;    // time when the key:value was set
    creator: string;    // identifier of the creator
}

export class Entity {
    type: string;
    name: string;
    properties: Array<Property>;
}

export class Context {
    dbLines: Array<string>;
    metaData: string = '';
    type: string = 'Ctxt';
    nrEntities: number;
    step: number = 0;
    branch: number = 0;
    status: string = 'ToDo';
    path: string = '';

    entities: Array<Entity>;
}