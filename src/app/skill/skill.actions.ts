import { Action } from '@ngrx/store';

import { Talent } from './talent.model';
import { Activity } from './activity.model';

export const SET_AVAILABLE_TALENTS = '[Skill] Set Available Talents';
export const SET_AVAILABLE_SKILLS = '[Skill] Set Available Skills';
export const SET_FINISHED_SKILLS = '[Skill] Set Finished Skills';
export const ADD_SKILL = '[Skill] Add Skill';
export const START_SKILL = '[Skill] Start Skill';
export const STOP_SKILL = '[Skill] Stop Skill';

export class SetAvailableTalents implements Action {
    readonly type = SET_AVAILABLE_TALENTS;

    constructor(public payload: Talent[]) {}
}

export class SetAvailableSkills implements Action {
    readonly type = SET_AVAILABLE_SKILLS;

    constructor(public payload: Activity[]) {}
}

export class SetFinishedSkills implements Action {
    readonly type = SET_FINISHED_SKILLS;

    constructor(public payload: Activity[]) {}
}

export class AddSkill implements Action {
    readonly type = ADD_SKILL;

    constructor(public payload: string) {}
}

export class StartSkill implements Action {
    readonly type = START_SKILL;

    constructor(public payload: string) {}
}

export class StopSkill implements Action {
    readonly type = STOP_SKILL;
}

export type SkillActions = 
    | SetAvailableTalents
    | SetAvailableSkills 
    | SetFinishedSkills 
    | AddSkill
    | StartSkill 
    | StopSkill;
