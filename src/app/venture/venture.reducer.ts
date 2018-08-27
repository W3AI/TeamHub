import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import { 
    VentureActions, 
    SET_AVAILABLE_VENTURES,
    SET_FINISHED_VENTURES, 
    START_VENTURE, 
    STOP_VENTURE
} from './venture.actions';
import { Test } from './test.model';
import * as fromRoot from '../app.reducer';

export interface VentureState {
    availableTests: Test[];
    finishedTests: Test[];
    activeVenture: Test;
}

export interface State extends fromRoot.State {
    venture: VentureState;
}

const initialState: VentureState = {
    availableTests: [],
    finishedTests: [],
    activeVenture: null
};

export function ventureReducer(state = initialState, action: VentureActions) {
    switch (action.type) {
        case SET_AVAILABLE_VENTURES:
            return {
                ...state,
               availableTests: action.payload
            };
            case SET_FINISHED_VENTURES:
            return {
                ...state,
                finishedTests: action.payload
            };
            case START_VENTURE:
            return {
                ...state,
                activeVenture: { ...state.availableTests.find(ex => ex.id === action.payload) }
            };
            case STOP_VENTURE:
            return {
                ...state,
                activeVenture: null
            };
        default: {
            return state;
        }
    }
};

export const getVentureState = createFeatureSelector<VentureState>('venture');

export const getAvailableTests = createSelector(getVentureState, (state: VentureState) => state.availableTests);
export const getFinishedTests = createSelector(getVentureState, (state: VentureState) => state.finishedTests);
export const getActiveVenture = createSelector(getVentureState, (state: VentureState) => state.activeVenture);
export const getIsVenture = createSelector(getVentureState, (state: VentureState) => state.activeVenture != null);

