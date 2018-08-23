import { Action } from '@ngrx/store';

import { Task } from './task.model';

export const SET_AVAILABLE_PROJECTS = '[Project] Set Available Projects';
export const SET_FINISHED_PROJECTS = '[Project] Set Finished Ptojects';
export const START_PROJECT = '[Project] Start Project';
export const STOP_PROJECT = '[Project] Stop Project';

export class SetAvailableProjects implements Action {
    readonly type = SET_AVAILABLE_PROJECTS;

    constructor(public payload: Task[]) {}
}

export class SetFinishedProjects implements Action {
    readonly type = SET_FINISHED_PROJECTS;

    constructor(public payload: Task[]) {}
}

export class StartProject implements Action {
    readonly type = START_PROJECT;

    constructor(public payload: string) {}
}

export class StopProject implements Action {
    readonly type = STOP_PROJECT;
}

export type ProjectActions = 
    | SetAvailableProjects 
    | SetFinishedProjects 
    | StartProject 
    | StopProject;
