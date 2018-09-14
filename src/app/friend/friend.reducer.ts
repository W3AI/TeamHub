import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import { 
    FriendActions, 
    SET_AVAILABLE_RELATIONS,
    SET_AVAILABLE_INVITES,
    ADD_RELATION,
    INVITE_RELATION,
} from './friend.actions';
import { Relation } from './relation.model';
import { Invite } from './invite.model';
import * as fromRoot from '../app.reducer';

export interface FriendState {
    availableRelations: Relation[];
    availableInvites: Invite[];
    activeFriend: Relation;
}

export interface State extends fromRoot.State {
    friend: FriendState;
}

const initialState: FriendState = {
    availableRelations: [],
    availableInvites: [],
    activeFriend: null
};

export function friendReducer(state = initialState, action: FriendActions) {
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
            activeFriend: { ...state.availableRelations.find(ex => ex.id === action.payload) }
        };
        case INVITE_RELATION:
        return {
            ...state,
            activeFriend: { ...state.availableInvites.find(ex => ex.id === action.payload) }
        };
        default: {
            return state;
        }
    }
};

export const getFriendState = createFeatureSelector<FriendState>('friend');

export const getAvailableFriends = createSelector(getFriendState, (state: FriendState) => state.availableRelations);
export const getAvailableInvites = createSelector(getFriendState, (state: FriendState) => state.availableInvites);
export const getActiveFriend = createSelector(getFriendState, (state: FriendState) => state.activeFriend);
export const getIsFriend = createSelector(getFriendState, (state: FriendState) => state.activeFriend != null);

