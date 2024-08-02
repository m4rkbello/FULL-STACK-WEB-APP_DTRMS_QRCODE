import {
    FETCH_RATES_REQUEST,
    FETCH_RATES_SUCCESS,
    FETCH_RATES_FAILURE,
    ADD_RATE_REQUEST,
    ADD_RATE_SUCCESS,
    ADD_RATE_FAILURE,
    UPDATE_RATE_REQUEST,
    UPDATE_RATE_SUCCESS,
    UPDATE_RATE_FAILURE,
    DELETE_RATE_REQUEST,
    DELETE_RATE_SUCCESS,
    DELETE_RATE_FAILURE,
    SEARCH_RATE_REQUEST,
    SEARCH_RATE_SUCCESS,
    SEARCH_RATE_FAILURE,
} from '../types/rateTypes'


const initialState = {
    rates: [],
    loading: false,
    error: null,
    search: [],
};

//3 PARAMETERS NA IMPORTANTE SA REDUCER - STATE, InitialState, ACTION
const rateReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_RATES_REQUEST:
        case ADD_RATE_REQUEST:
        case UPDATE_RATE_REQUEST:
        case DELETE_RATE_REQUEST:
        case SEARCH_RATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_RATES_SUCCESS:
            return {
                ...state,
                rates: action.payload, // Ensure payload structure is correct
                loading: false,
                error: null
            };
        case ADD_RATE_SUCCESS:
            return {
                ...state,
                rates: [...state.rates, action.payload],
                loading: false,
                error: null
            };
        case UPDATE_RATE_SUCCESS:
            return {
                ...state,
                rates: state.rates.map(rate => rate.id === action.payload.id ? action.payload : rate),
                loading: false,
                error: null
            };
        case DELETE_RATE_SUCCESS:
            return {
                ...state,
                rates: state.rates.filter(rate => rate.id !== action.payload),
                loading: false,
                error: null
            };
        case SEARCH_RATE_SUCCESS:
            return {
                ...state,
                loading: false,
                search: action.payload
            };
        case FETCH_RATES_FAILURE:
        case ADD_RATE_FAILURE:
        case UPDATE_RATE_FAILURE:
        case DELETE_RATE_FAILURE:
        case SEARCH_RATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}


export default rateReducer;