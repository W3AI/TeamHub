import { Action } from '@ngrx/store';

import { Group } from './group.model';
import { Player } from './player.model';

export const SET_AVAILABLE_TEAMS = '[Team] Set Available Teams';
export const SET_AVAILABLE_PLAYERS = '[Team] Set Available Players';
export const SET_INVITED_PLAYERS = '[Team] Set Invited Players';
export const ADD_PLAYER = '[Team] Add Player';
export const INVITE_PLAYER = '[Team] Start Player';
export const STOP_INVITING = '[Team] Stop Inviting';

export class SetAvailableTeams implements Action {
    readonly type = SET_AVAILABLE_TEAMS;

    constructor(public payload: Group[]) {}
}

export class SetAvailablePlayers implements Action {
    readonly type = SET_AVAILABLE_PLAYERS;

    constructor(public payload: Player[]) {}
}

export class SetInvitedPlayers implements Action {
    readonly type = SET_INVITED_PLAYERS;

    constructor(public payload: Player[]) {}
}

export class AddPlayer implements Action {
    readonly type = ADD_PLAYER;

    constructor(public payload: string) {}
}

export class InvitePlayer implements Action {
    readonly type = INVITE_PLAYER;

    constructor(public payload: string) {}
}

export class StopInviting implements Action {
    readonly type = STOP_INVITING;
}

export type TeamActions = 
    | SetAvailableTeams
    | SetAvailablePlayers 
    | SetInvitedPlayers 
    | AddPlayer
    | InvitePlayer 
    | StopInviting;
