//IMPORT ANG TANAN PAYROLL TYPES
import {
    FETCH_PAYROLLS_REQUEST,
    FETCH_PAYROLLS_SUCCESS,
    FETCH_PAYROLLS_FAILURE,
    ADD_PAYROLL_REQUEST,
    ADD_PAYROLL_SUCCESS,
    ADD_PAYROLL_FAILURE,
    UPDATE_PAYROLL_REQUEST,
    UPDATE_PAYROLL_SUCCESS,
    UPDATE_PAYROLL_FAILURE,
    DELETE_PAYROLL_REQUEST,
    DELETE_PAYROLL_SUCCESS,
    DELETE_PAYROLL_FAILURE,
    SEARCH_PAYROLL_REQUEST,
    SEARCH_PAYROLL_SUCCESS,
    SEARCH_PAYROLL_FAILURE,
} from '../types/payrollTypes.jsx';

//INITIALIZER DATA SA STATES
const initialState = {
    payrolls: [],
    loading: false,
    error: null,
    search: [],
};

//3 PARAMETERS NA IMPORTANTE SA REDUCER - STATE, InitialState, ACTION
const payrollReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PAYROLLS_REQUEST:
        case ADD_PAYROLL_REQUEST:
        case UPDATE_PAYROLL_REQUEST:
        case DELETE_PAYROLL_REQUEST:
        case SEARCH_PAYROLL_REQUEST:
            return  {
                ...state,
                loading: true,
                error: null  
            };
        case FETCH_PAYROLLS_SUCCESS:
            return {
                ...state,
                payrolls: action.payload,
                loading: false,
                error: null,
            };
        case ADD_PAYROLL_SUCCESS:
            return {
                ...state,
                payrolls: [...state.payrolls, action.payload],
                loading: false,
                error: null,
            };
        case UPDATE_PAYROLL_SUCCESS:
            return {
                ...state,
                payrolls: state.payrolls.map(payroll => payroll.id === action.payload.id ? action.payload : payroll),
                loading: false,
                error: null,
            };
        case DELETE_PAYROLL_SUCCESS: 
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SEARCH_PAYROLL_SUCCESS: 
            return {
                ...state,
                loading: false,
                error: null,
                search: action.payload
            };
        case FETCH_PAYROLLS_FAILURE:
        case ADD_PAYROLL_FAILURE:
        case UPDATE_PAYROLL_FAILURE:
        case DELETE_PAYROLL_FAILURE:
        case SEARCH_PAYROLL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default: 
            return state;

        }
}

export default payrollReducer;