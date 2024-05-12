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
        case FETCH_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                departments: action.payload,
                loading: false,
                error: null
            };
        case ADD_DEPARTMENT_SUCCESS:
            return {
                ...state,
                departments: [...state.departments, action.payload],
                loading: false,
                error: null
            };
        case UPDATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                departments: state.departments.map(department => department.id === action.payload.id ? action.payload : department),
                loading: false,
                error: null,
            };
        case DEACTIVATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                departments: state.departments.map(department => department.id === action.payload.id ? action.payload : department),
                loading: false,
                error: null,
            };
        case DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                departments: state.departments.filter(department => department.id !== action.payload),
                loading: false,
                error: null
            };
      
        case FETCH_DEPARTMENTS_FAILURE:
        case ADD_DEPARTMENT_FAILURE:
        case UPDATE_DEPARTMENT_FAILURE:
        case DELETE_DEPARTMENT_FAILURE:
        case DEACTIVATE_DEPARTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    } 
}


export default departmentReducer;












