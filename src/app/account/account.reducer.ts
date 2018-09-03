import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import { 
    AccountActions, 
    SET_AVAILABLE_CARDS,
    SET_AVAILABLE_ACCOUNTS,
    SET_FINISHED_ACCOUNTS, 
    ADD_ACCOUNT,
    ACTIVATE_ACCOUNT, 
    CANCEL_ACCOUNT
} from './account.actions';
import { Bank } from './bank.model';
import { Card } from './card.model';
import { Currency } from './currency.model';
import { Group } from './group.model';
import { Organization } from './organization.model';
import * as fromRoot from '../app.reducer';

export interface AccountState {
    availableCards: Card[];
    availableAccounts: Account[];
    finishedAccounts: Account[];
    activeAccount: Account;
}

export interface State extends fromRoot.State {
    project: AccountState;
}

const initialState: AccountState = {
    availableCards: [],
    availableAccounts: [],
    finishedAccounts: [],
    activeAccount: null
};

export function accountReducer(state = initialState, action: AccountActions) {
    switch (action.type) {
            case SET_AVAILABLE_CARDS:
            return {
                ...state,
               availableCards: action.payload
            };
            case SET_AVAILABLE_ACCOUNTS:
            return {
                ...state,
               availableAccounts: action.payload
            };
            case SET_FINISHED_ACCOUNTS:
            return {
                ...state,
                finishedAccounts: action.payload
            };
            case ADD_ACCOUNT:
            return {
                ...state,
                activeCard: { ...state.availableCards.find(ex => ex.id === action.payload) }
            };
            case ACTIVATE_ACCOUNT:
            return {
                ...state,
                activeAccount: { ...state.availableCards.find(ex => ex.id === action.payload) }
            };
            case CANCEL_ACCOUNT:
            return {
                ...state,
                activeAccount: null
            };
        default: {
            return state;
        }
    }
};

export const getAccountState = createFeatureSelector<AccountState>('account');

export const getAvailableCards = createSelector(getAccountState, (state: AccountState) => state.availableCards);
export const getAvailableAccounts = createSelector(getAccountState, (state: AccountState) => state.availableAccounts);
export const getFinishedAccounts = createSelector(getAccountState, (state: AccountState) => state.finishedAccounts);
export const getActiveAccount = createSelector(getAccountState, (state: AccountState) => state.activeAccount);
export const getIsAccount = createSelector(getAccountState, (state: AccountState) => state.activeAccount != null);

