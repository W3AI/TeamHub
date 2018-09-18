import { Action } from '@ngrx/store';

import { Investment } from './investment.model';
import { Control } from './control.model';
import { Plan } from "../project/plan.model";
import { Talent } from "../skill/talent.model";

export const SET_AVAILABLE_INVESTMENTS = '[Venture] Set Available Investments';
export const SET_AVAILABLE_PROJECTS = '[Venture] Set Available Projects';
export const SET_AVAILABLE_SERVICES = '[Venture] Set Available Services';
export const SET_AVAILABLE_VENTURES = '[Venture] Set Available Ventures';
export const SET_FINISHED_VENTURES = '[Venture] Set Finished Ventures';
export const ADD_VENTURE = '[Venture] Add Venture';
export const START_VENTURE = '[Venture] Start Venture';
export const STOP_VENTURE = '[Venture] Stop Venture';

export class SetAvailableInvestments implements Action {
    readonly type = SET_AVAILABLE_INVESTMENTS;

    constructor(public payload: Investment[]) {}
}

export class SetAvailableVentures implements Action {
    readonly type = SET_AVAILABLE_VENTURES;

    constructor(public payload: Investment[]) {}
}

export class SetAvailableProjects implements Action {
    readonly type = SET_AVAILABLE_PROJECTS;

    constructor(public payload: Plan[]) {}
}

export class SetAvailableServices implements Action {
    readonly type = SET_AVAILABLE_SERVICES;

    constructor(public payload: Talent[]) {}
}

export class SetFinishedVentures implements Action {
    readonly type = SET_FINISHED_VENTURES;

    constructor(public payload: Control[]) {}
}

export class AddVenture implements Action {
    readonly type = ADD_VENTURE;

    constructor(public payload: string) {}
}

export class StartVenture implements Action {
    readonly type = START_VENTURE;

    constructor(public payload: string) {}
}

export class StopVenture implements Action {
    readonly type = STOP_VENTURE;
}

export type VentureActions = 
    | SetAvailableInvestments 
    | SetAvailableVentures 
    | SetAvailableProjects 
    | SetAvailableServices 
    | SetFinishedVentures 
    | AddVenture
    | StartVenture 
    | StopVenture;
