import { Action } from '@ngrx/store';

import { Bank } from './bank.model';
import { Card } from './card.model';
import { Currency } from './currency.model';
import { Group } from './group.model';
import { Organization } from './organization.model';

export const SET_AVAILABLE_BANKS = '[Account] Set Available Banks';
export const SET_AVAILABLE_CARDS = '[Account] Set Available Cards';
export const SET_AVAILABLE_ACCOUNTS = '[Account] Set Available Accounts';
export const SET_FINISHED_ACCOUNTS = '[Account] Set Finished Accounts';
export const ADD_ACCOUNT = '[Account] Add Account';
export const ACTIVATE_ACCOUNT = '[Account] Activate Account';
export const CANCEL_ACCOUNT = '[Account] Cancell Account';

export class SetAvailableBanks implements Action {
    readonly type = SET_AVAILABLE_BANKS;

    constructor(public payload: Bank[]) {}
}

export class SetAvailableCards implements Action {
    readonly type = SET_AVAILABLE_CARDS;

    constructor(public payload: Card[]) {}
}

export class SetAvailableAccounts implements Action {
    readonly type = SET_AVAILABLE_ACCOUNTS;

    constructor(public payload: Bank[]) {}
}

export class SetFinishedAccounts implements Action {
    readonly type = SET_FINISHED_ACCOUNTS;

    constructor(public payload: Bank[]) {}
}

export class AddAccount implements Action {
    readonly type = ADD_ACCOUNT;

    constructor(public payload: string) {}
}

export class ActivateAccount implements Action {
    readonly type = ACTIVATE_ACCOUNT;

    constructor(public payload: string) {}
}

export class CancelAccount implements Action {
    readonly type = CANCEL_ACCOUNT;
}

export type AccountActions = 
    | SetAvailableBanks    
    | SetAvailableCards 
    | SetAvailableAccounts 
    | SetFinishedAccounts 
    | AddAccount
    | ActivateAccount 
    | CancelAccount;
