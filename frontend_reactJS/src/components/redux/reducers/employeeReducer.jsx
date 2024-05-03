import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_FAILURE,
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_FAILURE,
    UPDATE_EMPLOYEE_REQUEST,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_FAILURE,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAILURE,
    UPLOAD_AND_UPDATE_EMPLOYEE_REQUEST,
    UPLOAD_AND_UPDATE_EMPLOYEE_SUCCESS,
    UPLOAD_AND_UPDATE_EMPLOYEE_FAILURE
} from '../types/employeeTypes.jsx';

const initialState = {
    employees: [],
    loading: false,
    error: null,
    uploadAndUpdateImageLoadingEmployee: false,
    uploadAndUpdateImageEmployeeError: null,
};

const employeeReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_EMPLOYEES_REQUEST:
        case ADD_EMPLOYEE_REQUEST:
        case UPDATE_EMPLOYEE_REQUEST:
        case DELETE_EMPLOYEE_REQUEST:
        case UPLOAD_AND_UPDATE_EMPLOYEE_REQUEST:
            return  {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: action.payload,
                loading: false,
                error: null
            };
            case ADD_EMPLOYEE_SUCCESS:
                return {
                  ...state,
                  employees: [...state.employees, action.payload],
                  loading: false,
                  error: null
                };
        case UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: state.employees.map(employee => employee.id === action.payload.id ? action.payload : employee),
                loading: false,
                error: null,
            };
        case DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: state.employees.filter(employee => employee.id !== action.payload),
                loading: false,
                error: null
            };
        case UPLOAD_AND_UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                uploadAndUpdateImageLoadingEmployee: false,
                uploadAndUpdateImageEmployeeError: null,

            }
        case FETCH_EMPLOYEES_FAILURE:
        case ADD_EMPLOYEE_FAILURE:
        case UPDATE_EMPLOYEE_FAILURE:
        case DELETE_EMPLOYEE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPLOAD_AND_UPDATE_EMPLOYEE_FAILURE:
            return {
                ...state,
                uploadAndUpdateImageLoadingEmployee: true,
                uploadAndUpdateImageEmployeeError: action.payload,
            }
        default:
            return state;
    } 
}


export default employeeReducer;
