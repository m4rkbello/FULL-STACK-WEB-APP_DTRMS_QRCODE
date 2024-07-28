import MarkBelloApi from '../../../services/Api.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//IMPORT ALL THE TYPES OF RATES 
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

//MAG-FETCH UG DATA SA OVERTIMES NA TABLE
export const fetchOvertimes = () => async dispatch => {
    try {
        dispatch({ type: FETCH_OVERTIMES_REQUEST });
        // Perform async operation, e.g., fetch data from an API
        const overtimes = await MarkBelloApi.get('/api/overtimes/all');
        dispatch({
            type: FETCH_OVERTIMES_SUCCESS,
            payload: overtimes
        });
    } catch (error) {
        dispatch({
            type: FETCH_OVERTIMES_FAILURE,
            payload: error.message
        });
    }
};

//MAG ADD UG DATA SA OVERTIMES TABLE PASA SA ENDPOINT
export const addOvertime = AddOvertimeData => async dispatch => {
    try{
        dispatch({type: ADD_OVERTIME_REQUEST});

        const AddOvertimesRequestResponseData = await MarkBelloApi.post('/api/overtimes/add', AddOvertimeData);

        dispatch({
            type: ADD_OVERTIME_SUCCESS, 
            payload: AddOvertimesRequestResponseData
        })

    }catch (error){

        dispatch({
            type: ADD_OVERTIME_FAILURE,
            payload: error.message
        });

    }
};

//MAG UPDATE UG OVERTIME GAMIT ID NA GIKAN SA PROPS OR DESTRUCTURING SA REACT
export const updateOvertime = (overtimeId, updateOvertimeData) => async dispatch => {
    try{
        dispatch({ type: UPDATE_OVERTIME_REQUEST });
        //DATA VARIABLE NA NAGGUNIT UG RESPONSE UG REQUEST
        const updateOvertimesRequestAndResponseData = await MarkBelloApi.put(`/api/overtimes/update/item/${overtimeId}`, updateOvertimeData)

        if (!updateOvertimesRequestAndResponseData) {
            // Handle the case where the response is empty
            toast.error('Overtime data has not fillup correctly! 🥺⚠️👽', {
                position: 'top-right',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    background: 'black',
                    color: 'red',
                    fontSize: '15px'
                }
            });

        } else {
            // Handle the case where the update is successful
            toast.success('Overtime has been updated Successfully!👌👌👌', {
                position: 'top-right',
                autoClose: 3000,
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

            dispatch({ 
                type: UPDATE_OVERTIME_SUCCESS,
                payload: updateOvertimesRequestAndResponseData
            
            });
        }

    }catch (error){

        if (error.response && error.response.status !== 200 || error.response && error.response.status !== 201) {
            // Handle the case where the server returns a 500 error
            toast.error('Something went wrong on updating Overtime! 😛😛😛', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    background: 'black',
                    color: 'red',
                    fontSize: '15px'
                }
            });

            setTimeout(() => {
                window.location.reload();
              }, 3000)

        } else {
            // Handle other types of errors
            dispatch({
                type: UPDATE_OVERTIME_FAILURE,
                payload: error.message
            });
        }

    };
};

//DEACTIVATE OVERTIMES GAMIT ID
export const deactivateOvertime = overtimeId => async dispatch => {
    try{
        dispatch({
            type: DELETE_OVERTIME_REQUEST,
        });

        const deactivateOvertimeRequestAndResponseData = await MarkBelloApi.put(`/api/overtimes/deactivate/${overtimeId}`);

        if (deactivateOvertimeRequestAndResponseData.success != true) {
            // Handle the case where the response is empty
            toast.error('Overtime item has not deactivated! 🥺⚠️👽', {
                position: 'top-right',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    background: 'black',
                    color: 'red',
                    fontSize: '15px'
                }
            });
        } else {
            // Handle the case where the update is successful
            toast.success('Overtime item has been deactivated Successfully!👌👌👌', {
                position: 'top-right',
                autoClose: 3000,
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

            dispatch({
                type: DELETE_OVERTIME_SUCCESS,
                payload: deactivateOvertimeRequestAndResponseData,
            });
        }
            
    }catch (error){

        dispatch({
            type: DELETE_OVERTIME_FAILURE,
            payload: error.message
        });

    }
};

//SEARCH OVERTIME - Action to search overtime
export const searchOvertimes = searchQuery => async dispatch => {
    try {
        dispatch({ type: SEARCH_OVERTIME_REQUEST });

        const searchOvertimeRequestAndResponseData = await MarkBelloApi.post('/api/deductions/search', searchQuery);

        dispatch({
            type: SEARCH_OVERTIME_SUCCESS,
            payload: searchOvertimeRequestAndResponseData
        });

    } catch (error) {

        dispatch({
            type: SEARCH_OVERTIME_FAILURE,
            payload: error.message
        });

    }
};
