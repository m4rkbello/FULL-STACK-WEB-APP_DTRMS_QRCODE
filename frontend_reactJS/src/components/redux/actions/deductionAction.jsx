import MarkBelloApi from '../../../services/Api.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

//IMPORT TANANG TYPES SA DEDUCTIONS
import {
    FETCH_DEDUCTIONS_REQUEST,
    FETCH_DEDUCTIONS_SUCCESS,
    FETCH_DEDUCTIONS_FAILURE,
    ADD_DEDUCTION_REQUEST,
    ADD_DEDUCTION_SUCCESS,
    ADD_DEDUCTION_FAILURE,
    UPDATE_DEDUCTION_REQUEST,
    UPDATE_DEDUCTION_SUCCESS,
    UPDATE_DEDUCTION_FAILURE,
    DELETE_DEDUCTION_REQUEST,
    DELETE_DEDUCTION_SUCCESS,
    DELETE_DEDUCTION_FAILURE,
    SEARCH_DEDUCTION_REQUEST,
    SEARCH_DEDUCTION_SUCCESS,
    SEARCH_DEDUCTION_FAILURE,
} from '../types/deductionTypes.jsx';

//MAG-FETCH UG DATA SA DEDUCTION NA TABLE
export const fetchDeductions = () => async dispatch => {
    try {
        dispatch({ type: FETCH_DEDUCTIONS_REQUEST });

        const deductions = await MarkBelloApi.get('/api/deductions/all');
        dispatch({
            type: FETCH_DEDUCTIONS_SUCCESS,
            payload: deductions
        });
    } catch (error) {
        dispatch({
            type: FETCH_RATES_FAILURE,
            payload: error.message
        });
    }
};

//MAG ADD UG DEDUCTION
export const addDeduction = AddDeductionData => async dispatch => {
    try{
        dispatch({type: ADD_DEDUCTION_REQUEST});

        const AddDeductionRequestResponseData = await MarkBelloApi.post('/api/deductions/add', AddDeductionData);

        dispatch({
            type: ADD_DEDUCTION_SUCCESS, 
            payload: AddDeductionRequestResponseData
        })

    }catch (error){

        dispatch({
            type: ADD_DEDUCTION_FAILURE,
            payload: error.message
        });

    }
};

//MAG UPDATE UG DEDUCTION GAMIT ID
export const updateDeduction = (deductionId, updateDeductionData) => async dispatch => {
    try{
        dispatch({ type: UPDATE_DEDUCTION_REQUEST });
        //DATA VARIABLE NA NAGGUNIT UG RESPONSE UG REQUEST
        const updateDeductionRequestAndResponseData = await MarkBelloApi.put(`/api/deductions/update/item/${deductionId}`, updateDeductionData)

        if (!updateDeductionRequestAndResponseData) {
            // Handle the case where the response is empty
            toast.error('Deduction was not Fill-up correctly! 🥺⚠️👽', {
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
            toast.success('Deduction has been updated successfully!👌👌👌', {
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
                type: UPDATE_DEDUCTION_SUCCESS,
                payload: updateRateRequestAndResponse
            
            });
        }
    }catch (error){
        if (error.response && error.response.status !== 200 || error.response && error.response.status !== 201) {
            // Handle the case where the server returns a 500 error
            toast.error('Something went wrong on updating deduction! 😛😛😛', {
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
                type: UPDATE_DEDUCTION_FAILURE,
                payload: error.message
            });
        }
    }
};

//MAGE DEACTIVATE GAMIT ID SA DEDUCTION
export const deactivateDeduction = deductionId => async dispatch => {
    try{
        dispatch({
            type: DELETE_DEDUCTION_REQUEST,
        });

        const deactivateDeductionRequestAndResponseData = await MarkBelloApi.put(`/api/deductions/deactivate/${deductionId}`);

        if (deactivateDeductionRequestAndResponseData.success != true) {
            // Handle the case where the response is empty
            toast.error('Deduction has not deactivated! 🥺⚠️👽', {
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
            toast.success('Deduction deactivated Successfully!👌👌👌', {
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
                type: DELETE_DEDUCTION_SUCCESS,
                payload: deactivateDeductionRequestAndResponseData,
            });
        }
            
    }catch (error){

        dispatch({
            type: DELETE_DEDUCTION_FAILURE,
            payload: error.message
        });
    }

};

//SEARCH DEDUCTIONS - Action to search Deductions
export const searchDeduction = searchQuery => async dispatch => {
    try {
        dispatch({ type: SEARCH_DEDUCTION_REQUEST });

        const searchDeductionRequestAndResponseData = await MarkBelloApi.post('/api/deductions/search', searchQuery);

        dispatch({
            type: SEARCH_DEDUCTION_SUCCESS,
            payload: searchDeductionRequestAndResponseData
        });
    } catch (error) {
        dispatch({
            type: SEARCH_DEDUCTION_FAILURE,
            payload: error.message
        });
    }
};









