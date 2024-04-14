import MarkBelloApi from '../../../services/Api.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
} from '../types/employeeTypes.jsx';

//MAG-FETCH UG EMPLOYEE
export const fetchEmployees = () => async dispatch => {
    try {
        dispatch({ type: FETCH_EMPLOYEES_REQUEST });
        // Perform async operation, e.g., fetch data from an API
        const employees = await MarkBelloApi.get('/api/employees');
        dispatch({
            type: FETCH_EMPLOYEES_SUCCESS,
            payload: employees
        });
    } catch (error) {
        dispatch({
            type: FETCH_EMPLOYEES_FAILURE,
            payload: error.message
        });
    }
};

//MAG ADD UG EMPLOYEE 
export const addEmployee = newEmployee => async dispatch => {
    try {
        dispatch({ type: ADD_EMPLOYEE_REQUEST });
        // Perform async operation, e.g., send data to an API
        const addEmployee = await MarkBelloApi.post(newEmployee);
        dispatch({
            type: ADD_EMPLOYEE_SUCCESS,
            payload: addEmployee
        });
    } catch (error) {
        dispatch({
            type: ADD_EMPLOYEE_FAILURE,
            payload: error.message
        });
    }
};

//MAG UPDATE UG EMPLOYEE GAMIT ID
export const updateEmployee = (employeeId, updateEmployeeData) => async dispatch => {
    try {
        dispatch({ type: UPDATE_EMPLOYEE_REQUEST });
        // Perform async operation, e.g., send updated data to an API
        document.getElementById('loading-infinity').classList.add('loading', 'loading-infinity', 'loading-lg');
        const updateEmployee = await MarkBelloApi.put(`/api/employee/${employeeId}`, updateEmployeeData);

        dispatch({
            type: UPDATE_EMPLOYEE_SUCCESS,
            payload: updateEmployee
        });

        toast.success('Registered successfully!🤭😇🤗', {
            position: 'top-right',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                background: 'white',
                color: 'green',
                fontSize: '15px'
            }
        });

    } catch (error) {
        console.log("ERROR SA CATCH SA UPDATE EMPLOYEE", error);
        dispatch({
            type: UPDATE_EMPLOYEE_FAILURE,
            payload: error.message
        });

        // toast.error('Fill-up correctly! 🥺⚠️👽', {
        //     position: 'top-right',
        //     autoClose: 10000,
        //     hideProgressBar: false,
        //     closeOnClick: false,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     style: {
        //         background: 'black',
        //         color: 'red',
        //         fontSize: '15px'
        //     }
        // });

    }
};

//MAG DELETE UG EMPLOYEE
export const deleteEMPLOYEE = employeeId => async dispatch => {
    try {
        dispatch({ type: DELETE_EMPLOYEE_REQUEST });
        // Perform async operation, e.g., send delete request to an API
        await MarkBelloApi.delete(employeeId);
        dispatch({
            type: DELETE_EMPLOYEE_SUCCESS,
            payload: employeeId
        });
    } catch (error) {
        dispatch({
            type: DELETE_EMPLOYEE_FAILURE,
            payload: error.message
        });
    }
};