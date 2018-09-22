import * as ops from "../logic/helper";

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

    entityCells: Array<string>;
    properties: Array<Property>;
    values: Array<string>;

    entityMap: Map<string, any>;

    constructor(entityRow: string) {
        console.log('Servus from the Entity constructor');
        this.entityCells = ops.tokens(entityRow);

        console.log(this.entityCells);

        // To Initialize header - for now type and name 

        // Set the entityMap
        this.entityMap = new Map();
        console.log(this.entityMap);
        console.log(this.entityCells.length);
        // Below 6 is Currently the index of the first property
        // 3 is the increment to the next property name
        for (let i = 6; i <= this.entityCells.length - 3; i = i + 3) {
            this.entityMap.set(this.entityCells[i], this.entityCells[i + 2]);
        }
        console.log(this.entityMap.size);
    }
}

export class Context {
    type: string = 'Ctxt';
    step: number = 0;
    branch: number = 0;
    status: string = 'ToDo';
    path: string = '';

    contextRow: string = '';
    contextCells: Array<string>;

    nrEntities: number;
    entityRows: Array<string> = [];

    entities: Array<Entity> = [];

    constructor(contextRows: Array<string>) {
        console.log('Servus from the Context constructor');

        // Initialize Context fields / row
        this.contextRow = ops.pipes(contextRows[0]);
        this.contextCells = ops.tokens(this.contextRow);
        console.log(this.contextCells);

        for (let i = 1; i <contextRows.length; i++) {
            this.entityRows.push(ops.pipes(contextRows[i]));
            this.entities.push(new Entity(this.entityRows[i-1]));
        }
    }
}