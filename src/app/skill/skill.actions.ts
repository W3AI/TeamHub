import { Action } from '@ngrx/store';

import { Activity } from './activity.model';

export const SET_AVAILABLE_SKILLS = '[Skill] Set Available Skills';
export const SET_FINISHED_SKILLS = '[Skill] Set Finished Skills';
export const START_SKILL = '[Skill] Start Skill';
export const STOP_SKILL = '[Skill] Stop Skill';

export class SetAvailableSkills implements Action {
    readonly type = SET_AVAILABLE_SKILLS;

    constructor(public payload: Activity[]) {}
}

export class SetFinishedSkills implements Action {
    readonly type = SET_FINISHED_SKILLS;

    constructor(public payload: Activity[]) {}
}

export class StartSkill implements Action {
    readonly type = START_SKILL;

    constructor(public payload: string) {}
}

export class StopSkill implements Action {
    readonly type = STOP_SKILL;
}

export type SkillActions = 
    | SetAvailableSkills 
    | SetFinishedSkills 
    | StartSkill 
    | StopSkill;
