import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import { 
    SkillActions, 
    SET_AVAILABLE_SKILLS,
    SET_FINISHED_SKILLS, 
    START_SKILL, 
    STOP_SKILL
} from './skill.actions';
import { Activity } from './activity.model';
import * as fromRoot from '../app.reducer';

export interface SkillState {
    availableActivitys: Activity[];
    finishedActivitys: Activity[];
    activeSkill: Activity;
}

export interface State extends fromRoot.State {
    skill: SkillState;
}

const initialState: SkillState = {
    availableActivitys: [],
    finishedActivitys: [],
    activeSkill: null
};

export function skillReducer(state = initialState, action: SkillActions) {
    switch (action.type) {
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

export const getAvailableActivitys = createSelector(getSkillState, (state: SkillState) => state.availableActivitys);
export const getFinishedActivitys = createSelector(getSkillState, (state: SkillState) => state.finishedActivitys);
export const getActiveSkill = createSelector(getSkillState, (state: SkillState) => state.activeSkill);
export const getIsSkill = createSelector(getSkillState, (state: SkillState) => state.activeSkill != null);

