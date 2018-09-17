import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import { Plan } from "../project/plan.model";
import { Talent } from "../skill/talent.model";

import { 
    VentureActions, 
    SET_AVAILABLE_INVESTMENTS,
    SET_AVAILABLE_VENTURES,
    SET_AVAILABLE_PROJECTS,
    SET_AVAILABLE_SERVICES,
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
    availableProjects: Plan[];
    availableServices: Talent[];
    availableControls: Control[];
    finishedControls: Control[];
    activeVenture: Control;
    activeProject: Plan;
    activeService: Talent;
}

export interface State extends fromRoot.State {
    venture: VentureState;
}

const initialState: VentureState = {
    availableInvestments: [],
    availableProjects: [],
    availableServices: [],
    availableControls: [],
    finishedControls: [],
    activeVenture: null,
    activeProject: null,
    activeService: null
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
        case SET_AVAILABLE_PROJECTS:
        return {
            ...state,
           availableProjects: action.payload
        };
        case SET_AVAILABLE_SERVICES:
        return {
            ...state,
           availableServices: action.payload
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
        // TODO: Build the Venture/Investment structure that includes one Project and 
        // a set of services that have the change tags of the Project
        return {
            ...state,
            activeVenture: { ...state.availableControls.find(ex => ex.id === action.payload) },
            activeProject: { ...state.availableProjects.find(ex => ex.id === 'Vkz6btCEbWd5uEbo7s9D') },
            activeService: { ...state.availableServices.find(ex => ex.id === 'vXVcbiPTc0bowX2aoxEC') }
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

export const getAvailableProjects = createSelector(getVentureState, (state: VentureState) => state.availableProjects);
export const getAvailableServices = createSelector(getVentureState, (state: VentureState) => state.availableServices);

export const getAvailableControls = createSelector(getVentureState, (state: VentureState) => state.availableControls);
export const getFinishedControls = createSelector(getVentureState, (state: VentureState) => state.finishedControls);
export const getActiveVenture = createSelector(getVentureState, (state: VentureState) => state.activeVenture);
export const getIsVenture = createSelector(getVentureState, (state: VentureState) => state.activeVenture != null);

