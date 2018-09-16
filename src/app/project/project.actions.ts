import { Action } from '@ngrx/store';

import { Plan } from './plan.model';
import { Task } from './task.model';

export const SET_AVAILABLE_PLANS = '[Project] Set Available Plans';
export const SET_AVAILABLE_PROJECTS = '[Project] Set Available Projects';
export const SET_FINISHED_PROJECTS = '[Project] Set Finished Ptojects';
export const ADD_PROJECT = '[Project] Add Project';
export const START_PROJECT = '[Project] Start Project';
export const STOP_PROJECT = '[Project] Stop Project';

export class SetAvailablePlans implements Action {
    readonly type = SET_AVAILABLE_PLANS;

    constructor(public payload: Plan[]) {}
}

export class SetAvailableProjects implements Action {
    readonly type = SET_AVAILABLE_PROJECTS;

    constructor(public payload: Task[]) {}
}

export class SetFinishedProjects implements Action {
    readonly type = SET_FINISHED_PROJECTS;

    constructor(public payload: Task[]) {}
}

export class AddProject implements Action {
    readonly type = ADD_PROJECT;

    constructor(public payload: string) {}
}

export class StartProject implements Action {
    readonly type = START_PROJECT;

    constructor(public payload: string) {}
}

export class StopProject implements Action {
    readonly type = STOP_PROJECT;
}

export type ProjectActions = 
    | SetAvailablePlans 
    | SetAvailableProjects 
    | SetFinishedProjects 
    | AddProject
    | StartProject 
    | StopProject;
