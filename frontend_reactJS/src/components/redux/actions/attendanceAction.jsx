import MarkBelloApi from '../../../services/Api.jsx';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

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

import {
    QRCODE_ATTENDANCE_REQUEST,
    QRCODE_ATTENDANCE_SUCCESS,
    QRCODE_ATTENDANCE_FAILURE,
} from '../types/attendanceTypes.jsx';


//MAG-FETCH UG EMPLOYEE
export const fetchAttendances = () => async dispatch => {
    try {
        dispatch({ type: FETCH_EMPLOYEES_REQUEST });
        // Perform async operation, e.g., fetch data from an API
        const attendances = await MarkBelloApi.get('/api/employees');
        dispatch({
            type: FETCH_EMPLOYEES_SUCCESS,
            payload: attendances
        });
    } catch (error) {
        dispatch({
            type: FETCH_EMPLOYEES_FAILURE,
            payload: error.message
        });
    }
};

//MAG ADD UG EMPLOYEE 
export const addAttendance = newAttendance => async dispatch => {
    try {
        dispatch({ type: ADD_EMPLOYEE_REQUEST });
        // Perform async operation, e.g., send data to an API
        const addAttendance = await MarkBelloApi.post(newAttendance);
        dispatch({
            type: ADD_EMPLOYEE_SUCCESS,
            payload: addAttendance
        });
    } catch (error) {
        dispatch({
            type: ADD_EMPLOYEE_FAILURE,
            payload: error.message
        });
    }
};

//MAG UPDATE UG EMPLOYEE GAMIT ID
export const updateAttendance = (attendanceId, updatedAttendanceData) => async dispatch => {
    try {
        dispatch({ type: UPDATE_EMPLOYEE_REQUEST });
        // Perform async operation, e.g., send updated data to an API
        const updateAttendance = await MarkBelloApi.put(attendanceId, updatedAttendanceData);
        dispatch({
            type: UPDATE_EMPLOYEE_SUCCESS,
            payload: updateAttendance
        });
    } catch (error) {
        dispatch({
            type: UPDATE_EMPLOYEE_FAILURE,
            payload: error.message
        });
    }
};

//MAG DELETE UG EMPLOYEE
export const deleteAttendance = attendanceId => async dispatch => {
    try {
        dispatch({ type: DELETE_EMPLOYEE_REQUEST });
        // Perform async operation, e.g., send delete request to an API
        await MarkBelloApi.delete(attendanceId);
        dispatch({
            type: DELETE_EMPLOYEE_SUCCESS,
            payload: attendanceId
        });
    } catch (error) {
        dispatch({
            type: DELETE_EMPLOYEE_FAILURE,
            payload: error.message
        });
    }
};


// ISKANON SA FRONTEND TAPOS ILABAY SA REDUX SA ENDPOINT
export const qrCodeAttendance = (email) => async (dispatch) => {
    try {
        dispatch({ type: QRCODE_ATTENDANCE_REQUEST });
        const response = await MarkBelloApi.post('/api/scan-qrcode', { email });
        dispatch({
            type: QRCODE_ATTENDANCE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: QRCODE_ATTENDANCE_FAILURE,
            payload: error.message,
        });
    }
};