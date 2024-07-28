
//IMPORT TANANG TYPES SA DEDUCTIONS
import {
    FETCH_DEDUCTIONS_REQUEST,
    FETCH_DEDUCTIONS_SUCCESS,
    FETCH_DEDUCTIONS_FAILURE,
    ADD_DEDUCTION_REQUEST,
    ADD_DEDUCTION_SUCCESS,
    ADD_DEDUCTION_FAILURE,
    UPDATE_DEDUCTION_REQUEST,
    UPDATE_DEDUCTION_SUCCESS,
    UPDATE_DEDUCTION_FAILURE,
    DELETE_DEDUCTION_REQUEST,
    DELETE_DEDUCTION_SUCCESS,
    DELETE_DEDUCTION_FAILURE,
    SEARCH_DEDUCTION_REQUEST,
    SEARCH_DEDUCTION_SUCCESS,
    SEARCH_DEDUCTION_FAILURE,
} from '../types/deductionTypes.jsx';

//INITIALIZER SA DEDUCTIONS 
const initialState = {
    deductions: [],
    loading: false,
    error: null,
    search: [],
};


//3 PARAMETERS NA IMPORTANTE SA REDUCER - STATE, InitialState, ACTION
const deductionReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_DEDUCTIONS_REQUEST:
        case ADD_DEDUCTION_REQUEST:
        case UPDATE_DEDUCTION_REQUEST:
        case DELETE_DEDUCTION_REQUEST:
        case SEARCH_DEDUCTION_REQUEST:
            return  {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_DEDUCTIONS_SUCCESS:
            return  {
                ...state,
                loading: false,
                deductions: action.payload,
                error: null,
            };
        case ADD_DEDUCTION_SUCCESS:
            return  {
                ...state,
                loading: false,
                deductions: [...state.deductions, action.payload],
                error: null,
            };
        case UPDATE_DEDUCTION_SUCCESS:
            return  {
                ...state,
                deductions: state.deductions.map(deduction => deduction.id === action.payload.id ? action.payload : deduction),
                loading: false,
                error: null
            };
        case DELETE_DEDUCTION_SUCCESS:
            return {
                ...state,
                loading: false,
                deduction: state.deductions.filter(deduction => deduction.id !== action.payload),
                error: null
            };
        case SEARCH_DEDUCTION_SUCCESS:
            return {
                ...state,
                loading: false,
                search: action.payload,
            };
        case FETCH_DEDUCTIONS_FAILURE:
        case ADD_DEDUCTION_FAILURE:
        case UPDATE_DEDUCTION_FAILURE:
        case DELETE_DEDUCTION_FAILURE:
        case SEARCH_DEDUCTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;

    }
}

export default deductionReducer;

