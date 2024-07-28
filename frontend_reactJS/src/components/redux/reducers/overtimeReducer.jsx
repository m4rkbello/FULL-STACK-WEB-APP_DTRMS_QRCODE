import {
    FETCH_OVERTIMES_REQUEST,
    FETCH_OVERTIMES_SUCCESS,
    FETCH_OVERTIMES_FAILURE,
    ADD_OVERTIME_REQUEST,
    ADD_OVERTIME_SUCCESS,
    ADD_OVERTIME_FAILURE,
    UPDATE_OVERTIME_REQUEST,
    UPDATE_OVERTIME_SUCCESS,
    UPDATE_OVERTIME_FAILURE,
    DELETE_OVERTIME_REQUEST,
    DELETE_OVERTIME_SUCCESS,
    DELETE_OVERTIME_FAILURE,
    SEARCH_OVERTIME_REQUEST,
    SEARCH_OVERTIME_SUCCESS,
    SEARCH_OVERTIME_FAILURE
} from '../types/overtimeTypes.jsx';


//ADD INITIALIZER
const initialState = {
    overtimes: [],
    loading: false,
    error: null,
    search: [],
};

//3 PARAMETERS NA IMPORTANTE SA REDUCER - STATE, InitialState, ACTION
const overtimeReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_OVERTIMES_REQUEST:
        case ADD_OVERTIME_REQUEST:
        case UPDATE_OVERTIME_REQUEST:
        case DELETE_OVERTIME_REQUEST:
        case SEARCH_OVERTIME_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_OVERTIMES_SUCCESS:
            return {
                ...state,
                overtimes: action.payload,
                loading: false,
                error: null
            };
        case ADD_OVERTIME_SUCCESS:
            return  {
                ...state,
                overtimes: [...state.overtimes, action.payload],
                loading: false,
                error: null
            };
        case UPDATE_OVERTIME_SUCCESS:
            return {
                ...state,
                overtimes: state.overtimes.map(overtime => overtime.id === action.payload.id ? action.payload : overtime),
                loading: false,
                error: null
            };
        case DELETE_OVERTIME_SUCCESS:
            return  {
                ...state,
                overtimes: state.overtimes.filter(overtime => overtime.id !== action.payload),
                loading: false,
                error: null
            };
        case SEARCH_OVERTIME_SUCCESS:
            return {
                ...state,
                loading: false,
                search: action.payload
            };
        case FETCH_OVERTIMES_FAILURE:
        case ADD_OVERTIME_FAILURE:
        case UPDATE_OVERTIME_FAILURE:
        case DELETE_OVERTIME_FAILURE:
        case SEARCH_OVERTIME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}


export default overtimeReducer;