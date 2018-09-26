import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import { 
    SessionActions, 
    SET_AVAILABLE_RELATIONS,
    SET_AVAILABLE_INVITES,
    ADD_RELATION,
    INVITE_RELATION,
} from './session.actions';
import { Relation } from './relation.model';
import { Invite } from './invite.model';
import * as fromRoot from '../app.reducer';

export interface SessionState {
    availableRelations: Relation[];
    availableInvites: Invite[];
    activeSession: Relation;
}

export interface State extends fromRoot.State {
    session: SessionState;
}

const initialState: SessionState = {
    availableRelations: [],
    availableInvites: [],
    activeSession: null
};

export function sessionReducer(state = initialState, action: SessionActions) {
    switch (action.type) {
        case SET_AVAILABLE_RELATIONS:
        return {
            ...state,
           availableRelations: action.payload
        };
        case SET_AVAILABLE_INVITES:
        return {
            ...state,
           availableInvites: action.payload
        };
        case ADD_RELATION:
        return {
            ...state,
            activeSession: { ...state.availableRelations.find(ex => ex.id === action.payload) }
        };
        case INVITE_RELATION:
        return {
            ...state,
            activeSession: { ...state.availableInvites.find(ex => ex.id === action.payload) }
        };
        default: {
            return state;
        }
    }
};

export const getSessionState = createFeatureSelector<SessionState>('session');

export const getAvailableSessions = createSelector(getSessionState, (state: SessionState) => state.availableRelations);
export const getAvailableInvites = createSelector(getSessionState, (state: SessionState) => state.availableInvites);
export const getActiveSession = createSelector(getSessionState, (state: SessionState) => state.activeSession);
export const getIsSession = createSelector(getSessionState, (state: SessionState) => state.activeSession != null);

