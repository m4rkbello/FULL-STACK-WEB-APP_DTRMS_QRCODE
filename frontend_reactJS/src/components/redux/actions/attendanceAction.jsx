/* eslint-disable no-unused-vars */
import MarkBelloApi from '../../../services/Api.jsx';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {
    FETCH_ATTENDANCES_REQUEST,
    FETCH_ATTENDANCES_SUCCESS,
    FETCH_ATTENDANCES_FAILURE,
    ADD_ATTENDANCE_REQUEST,
    ADD_ATTENDANCE_SUCCESS,
    ADD_ATTENDANCE_FAILURE,
    UPDATE_ATTENDANCE_REQUEST,
    UPDATE_ATTENDANCE_SUCCESS,
    UPDATE_ATTENDANCE_FAILURE,
    DELETE_ATTENDANCE_REQUEST,
    DELETE_ATTENDANCE_SUCCESS,
    DELETE_ATTENDANCE_FAILURE,

    QRCODE_ATTENDANCE_REQUEST,
    QRCODE_ATTENDANCE_SUCCESS,
    QRCODE_ATTENDANCE_FAILURE,
} from '../types/attendanceTypes.jsx';



//MAG-FETCH UG EMPLOYEE
export const fetchAttendances = () => async dispatch => {
    try {
        dispatch({ type: FETCH_ATTENDANCES_REQUEST });
        // Perform async operation, e.g., fetch data from an API
        const attendances = await MarkBelloApi.get('/api/attendances/collections/all');
        dispatch({
            type: FETCH_ATTENDANCES_SUCCESS,
            payload: attendances
        });
    } catch (error) {
        dispatch({
            type: FETCH_ATTENDANCES_FAILURE,
            payload: error.message
        });
    }
};


//MAG ADD UG EMPLOYEE 
export const addAttendance = newAttendance => async dispatch => {
    try {
        dispatch({ type: ADD_ATTENDANCE_REQUEST });
        // Perform async operation, e.g., send data to an API
        const addAttendance = await MarkBelloApi.post(newAttendance);
        dispatch({
            type: ADD_ATTENDANCE_SUCCESS,
            payload: addAttendance
        });
    } catch (error) {
        dispatch({
            type: ADD_ATTENDANCE_FAILURE,
            payload: error.message
        });
    }
};

//MAG UPDATE UG ATTENDANCE GAMIT ID
export const updateAttendance = (attendanceId, updatedAttendanceData) => async dispatch => {
    try {
        dispatch({ type: UPDATE_ATTENDANCE_REQUEST });
        // Perform async operation, e.g., send updated data to an API
        const updateAttendance = await MarkBelloApi.put(attendanceId, updatedAttendanceData);
        dispatch({
            type: UPDATE_ATTENDANCE_SUCCESS,
            payload: updateAttendance
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ATTENDANCE_FAILURE,
            payload: error.message
        });
    }
};

//MAG DELETE UG ATTENDANCE
export const deleteAttendance = attendanceId => async dispatch => {
    try {
        dispatch({ type: DELETE_ATTENDANCE_REQUEST });
        // Perform async operation, e.g., send delete request to an API
        await MarkBelloApi.delete(attendanceId);
        dispatch({
            type: DELETE_ATTENDANCE_SUCCESS,
            payload: attendanceId
        });
    } catch (error) {
        dispatch({
            type: DELETE_ATTENDANCE_FAILURE,
            payload: error.message
        });
    }
};

// ISKANON SA FRONTEND TAPOS ILABAY SA REDUX SA ENDPOINT
export const qrCodeAttendance = (data) => async (dispatch) => {
    try {
        console.log("qrCodeAttendance action called with data:", data);
        dispatch({ type: QRCODE_ATTENDANCE_REQUEST });

        // Post request to the API
        const response = await MarkBelloApi.post('api/attendances/qrcode/data', { employee_email: data.employee_email });
        console.log("Full API Response:", response);

        if (response.data && response.data.success) {
            dispatch({
                type: QRCODE_ATTENDANCE_SUCCESS,
                payload: response.data,
            });
            return response.data;
        } else {
            throw new Error(response.data.message || 'Unknown error');
        }
    } catch (error) {
        console.error("Full Error Object:", error);
        console.error("Error Response Data:", error.response?.data);
        dispatch({
            type: QRCODE_ATTENDANCE_FAILURE,
            payload: error.message,
        });
        throw error;
    }
};