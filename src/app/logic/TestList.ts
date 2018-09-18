export class Test {
    name: string;
    tested: Date;
    result: string;

    contextId: number;
    entityType: string;
    propertyName: string;
    conditionalTest: string;
    propertyValue: any;

}

export class TestList {
    // ? - list of statuses?
    status: string;

    // ?
    inputList: string;

    tests: Set<Test>;

    
}