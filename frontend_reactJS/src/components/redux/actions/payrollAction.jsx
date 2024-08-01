/* eslint-disable no-unused-vars */
import MarkBelloApi from '../../../services/Api.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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
} from '../types/payrollTypes.jsx'

//MAG-FETCH UG DATA SA PAYROLL NA TABLE
export const fetchPayrolls = () => async dispatch => {
    try {
        dispatch({ type: FETCH_PAYROLLS_REQUEST });
        // Perform async operation, e.g., fetch data from an API
        const payrolls = await MarkBelloApi.get('/api/payrolls/collections/all');
    
        dispatch({
            type: FETCH_PAYROLLS_SUCCESS,
            payload: payrolls
        });

    } catch (error) {

        dispatch({
            type: FETCH_PAYROLLS_FAILURE,
            payload: error.message
        });

    }
};

//MAG ADD UG PAYROLL 
export const addPayroll = AddPayrollData => async dispatch => {
    try{
        dispatch({type: ADD_PAYROLL_REQUEST});

        const AddPayrollRequestResponse = await MarkBelloApi.post('/api/payrolls/add', AddPayrollData);

        dispatch({
            type: ADD_PAYROLL_SUCCESS, 
            payload: AddPayrollRequestResponse
        })

    }catch (error){
        dispatch({
            type: ADD_PAYROLL_FAILURE,
            payload: error.message
        });
    }
};

//MAG UPDATE UG RATES GAMIT ID
export const updatePayroll = (payrollId, updatePayrollData) => async dispatch => {
    try{
        dispatch({ type: UPDATE_PAYROLL_REQUEST });
        //DATA VARIABLE NA NAGGUNIT UG RESPONSE UG REQUEST
        const updatePayrollRequestAndResponse = await MarkBelloApi.put(`/api/payrolls/update/${payrollId}`, updatePayrollData)

        if (!updatePayrollRequestAndResponse) {
            // Handle the case where the response is empty
            toast.error('Payroll should Fill-up it correctly! 🥺⚠️👽', {
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
            toast.success('Payroll Updated Successfully!👌👌👌', {
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
                type: UPDATE_PAYROLL_SUCCESS,
                payload: updatePayrollRequestAndResponse
            
            });
        }
    }catch (error){
        if (error.response && error.response.status !== 200 || error.response && error.response.status !== 201) {
            // Handle the case where the server returns a 500 error
            toast.error('Something went wrong! 😛😛😛', {
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
                type: UPDATE_PAYROLL_FAILURE,
                payload: error.message
            });
        }
    }
};

//DEACTIVATE PAYROLL GAMIT ID
export const deactivatePayroll = payrollId => async dispatch => {
    try{
        dispatch({
            type: DELETE_PAYROLL_REQUEST,
        });

        const deactivatePayrollRequestAndResponse = await MarkBelloApi.put(`/api/rates/deactivate/${payrollId}`);

        if (deactivatePayrollRequestAndResponse.success != true) {
            // Handle the case where the response is empty
            toast.error('Payroll has not deactivated! 🥺⚠️👽', {
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
            toast.success('Payroll has been deactivated successfully!👌👌👌', {
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
                type: DELETE_PAYROLL_SUCCESS,
                payload: deactivatePayrollRequestAndResponse,
            });
        }
            
    }catch (error){

        dispatch({
            type: DELETE_PAYROLL_FAILURE,
            payload: error.message
        });
    }

};

//SEARCH PAYROLL - Action to search payroll
export const searchPayroll = searchQuery => async dispatch => {
    try {
        dispatch({ type: SEARCH_PAYROLL_REQUEST });

        const searchQueryRequestAndResponseData = await MarkBelloApi.post('/api/payroll/search', searchQuery);

        dispatch({
            type: SEARCH_PAYROLL_SUCCESS,
            payload: searchQueryRequestAndResponseData
        });
    } catch (error) {
        dispatch({
            type: SEARCH_PAYROLL_FAILURE,
            payload: error.message
        });
    }
};





























