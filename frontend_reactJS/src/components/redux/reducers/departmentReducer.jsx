/* eslint-disable react-hooks/rules-of-hooks */
import MarkBelloApi from '../../../services/Api.jsx';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


import { 
    ADD_DEPARTMENT_REQUEST,
    ADD_DEPARTMENT_SUCCESS,
    ADD_DEPARTMENT_FAILURE,
    DEACTIVATE_DEPARTMENT_REQUEST,
    DEACTIVATE_DEPARTMENT_SUCCESS,
    DEACTIVATE_DEPARTMENT_FAILURE,
    DELETE_DEPARTMENT_REQUEST,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAILURE,
    FETCH_DEPARTMENTS_REQUEST,
    FETCH_DEPARTMENTS_SUCCESS,
    FETCH_DEPARTMENTS_FAILURE,
    UPDATE_DEPARTMENT_REQUEST,
    UPDATE_DEPARTMENT_FAILURE,
    UPDATE_DEPARTMENT_SUCCESS 
}
from '../types/departmentTypes.jsx';


const initialState = {
    departments: [],
    loading: false,
    error: null,
};

const departmentReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_DEPARTMENTS_REQUEST:
        case ADD_DEPARTMENT_REQUEST:
        case DEACTIVATE_DEPARTMENT_REQUEST:
        case DELETE_DEPARTMENT_REQUEST:
        case UPDATE_DEPARTMENT_REQUEST:
            return  {
                ...state,
                loading: true,
                error: null
            };
        case ADD_DEPARTMENT_SUCCESS:
            return {
                ...state,
                employees: action.payload,
                loading: false,
                error: null
            };
            case DEACTIVATE_DEPARTMENT_SUCCESS:
                return {
                  ...state,
                  employees: [...state.employees, action.payload],
                  loading: false,
                  error: null
                };
        case DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                employees: state.employees.map(employee => employee.id === action.payload.id ? action.payload : employee),
                loading: false,
                error: null,
            };
        case FETCH_DEPARTMENTS_SUCCESS:
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


export default departmentReducer;












