import { Action } from '@ngrx/store';

import { Test } from './test.model';

export const SET_AVAILABLE_VENTURES = '[Venture] Set Available Ventures';
export const SET_FINISHED_VENTURES = '[Venture] Set Finished Ventures';
export const START_VENTURE = '[Venture] Start Venture';
export const STOP_VENTURE = '[Venture] Stop Venture';

export class SetAvailableVentures implements Action {
    readonly type = SET_AVAILABLE_VENTURES;

    constructor(public payload: Test[]) {}
}

export class SetFinishedVentures implements Action {
    readonly type = SET_FINISHED_VENTURES;

    constructor(public payload: Test[]) {}
}

export class StartVenture implements Action {
    readonly type = START_VENTURE;

    constructor(public payload: string) {}
}

export class StopVenture implements Action {
    readonly type = STOP_VENTURE;
}

export type VentureActions = 
    | SetAvailableVentures 
    | SetFinishedVentures 
    | StartVenture 
    | StopVenture;
