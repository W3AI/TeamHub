import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import { 
    TeamActions, 
    SET_AVAILABLE_TEAMS,
    SET_AVAILABLE_PLAYERS,
    SET_INVITED_PLAYERS, 
    ADD_PLAYER,
    INVITE_PLAYER, 
    STOP_INVITING
} from './team.actions';
import { Group } from './group.model';
import { Player } from './player.model';
import * as fromRoot from '../app.reducer';

export interface TeamState {
    availableGroups: Group[];
    availablePlayers: Player[];
    invitedPlayers: Player[];
    activePlayer: Player;
}

export interface State extends fromRoot.State {
    skill: TeamState;
}

const initialState: TeamState = {
    availableGroups: [],
    availablePlayers: [],
    invitedPlayers: [],
    activePlayer: null
};

export function teamReducer(state = initialState, action: TeamActions) {
    switch (action.type) {
        case SET_AVAILABLE_TEAMS:
        return {
            ...state,
           availableGroups: action.payload
        };
        case SET_AVAILABLE_PLAYERS:
        return {
           ...state,
           availablePlayers: action.payload
        };
        case SET_INVITED_PLAYERS:
        return {
            ...state,
            invitedPlayers: action.payload
        };
        case ADD_PLAYER:
        return {
            ...state,
            activePlayer: { ...state.availableGroups.find(ex => ex.id === action.payload) }
        };
        case INVITE_PLAYER:
        return {
            ...state,
            activePlayer: { ...state.availablePlayers.find(ex => ex.id === action.payload) }
        };
        case STOP_INVITING:
        return {
            ...state,
            activePlayer: null
        };
        default: {
            return state;
        }
    }
};

export const getTeamState = createFeatureSelector<TeamState>('team');

export const getAvailableGroups = createSelector(getTeamState, (state: TeamState) => state.availableGroups);
export const getAvailablePlayers = createSelector(getTeamState, (state: TeamState) => state.availablePlayers);
export const getInvitedPlayers = createSelector(getTeamState, (state: TeamState) => state.invitedPlayers);
export const getActivePlayer = createSelector(getTeamState, (state: TeamState) => state.activePlayer);
export const getIsPlayer = createSelector(getTeamState, (state: TeamState) => state.activePlayer != null);

