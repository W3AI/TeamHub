import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import { 
    VentureActions, 
    SET_AVAILABLE_INVESTMENTS,
    SET_AVAILABLE_VENTURES,
    SET_FINISHED_VENTURES, 
    ADD_VENTURE,
    START_VENTURE, 
    STOP_VENTURE
} from './venture.actions';
import { Investment } from './investment.model';
import { Control } from './control.model';
import * as fromRoot from '../app.reducer';

export interface VentureState {
    availableInvestments: Investment[];
    availableControls: Control[];
    finishedControls: Control[];
    activeVenture: Control;
}

export interface State extends fromRoot.State {
    venture: VentureState;
}

const initialState: VentureState = {
    availableInvestments: [],
    availableControls: [],
    finishedControls: [],
    activeVenture: null
};

export function ventureReducer(state = initialState, action: VentureActions) {
    switch (action.type) {
        case SET_AVAILABLE_INVESTMENTS:
        return {
            ...state,
           availableInvestments: action.payload
        };
        case SET_AVAILABLE_VENTURES:
        return {
            ...state,
           availableControls: action.payload
        };
        case SET_FINISHED_VENTURES:
        return {
            ...state,
            finishedControls: action.payload
        };
        case ADD_VENTURE:
        return {
            ...state,
            activeInvestment: { ...state.availableInvestments.find(ex => ex.id === action.payload) }
        };
        case START_VENTURE:
        return {
            ...state,
            activeVenture: { ...state.availableControls.find(ex => ex.id === action.payload) }
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

export const getAvailableInvestments = createSelector(getVentureState, (state: VentureState) => state.availableInvestments);
export const getAvailableControls = createSelector(getVentureState, (state: VentureState) => state.availableControls);
export const getFinishedControls = createSelector(getVentureState, (state: VentureState) => state.finishedControls);
export const getActiveVenture = createSelector(getVentureState, (state: VentureState) => state.activeVenture);
export const getIsVenture = createSelector(getVentureState, (state: VentureState) => state.activeVenture != null);

