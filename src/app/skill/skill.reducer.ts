import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import { 
    SkillActions, 
    SET_AVAILABLE_TALENTS,
    SET_AVAILABLE_SKILLS,
    SET_FINISHED_SKILLS, 
    ADD_SKILL,
    START_SKILL, 
    STOP_SKILL
} from './skill.actions';
import { Talent } from './talent.model';
import { Activity } from './activity.model';
import * as fromRoot from '../app.reducer';

export interface SkillState {
    availableTalents: Talent[];
    availableActivitys: Activity[];
    finishedActivitys: Activity[];
    activeSkill: Activity;
}

export interface State extends fromRoot.State {
    skill: SkillState;
}

const initialState: SkillState = {
    availableTalents: [],
    availableActivitys: [],
    finishedActivitys: [],
    activeSkill: null
};

export function skillReducer(state = initialState, action: SkillActions) {
    switch (action.type) {
        case SET_AVAILABLE_TALENTS:
        return {
            ...state,
           availableTalents: action.payload
        };
        case SET_AVAILABLE_SKILLS:
        return {
           ...state,
           availableActivitys: action.payload
        };
        case SET_FINISHED_SKILLS:
        return {
            ...state,
            finishedActivitys: action.payload
        };
        case ADD_SKILL:
        return {
            ...state,
            activeSkill: { ...state.availableTalents.find(ex => ex.id === action.payload) }
        };
        case START_SKILL:
        return {
            ...state,
            activeSkill: { ...state.availableActivitys.find(ex => ex.id === action.payload) }
        };
        case STOP_SKILL:
        return {
            ...state,
            activeSkill: null
        };
        default: {
            return state;
        }
    }
};

export const getSkillState = createFeatureSelector<SkillState>('skill');

export const getAvailableTalents = createSelector(getSkillState, (state: SkillState) => state.availableTalents);
export const getAvailableActivitys = createSelector(getSkillState, (state: SkillState) => state.availableActivitys);
export const getFinishedActivitys = createSelector(getSkillState, (state: SkillState) => state.finishedActivitys);
export const getActiveSkill = createSelector(getSkillState, (state: SkillState) => state.activeSkill);
export const getIsSkill = createSelector(getSkillState, (state: SkillState) => state.activeSkill != null);

