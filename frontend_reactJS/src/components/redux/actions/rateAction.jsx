import MarkBelloApi from '../../../services/Api.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
//IMPORT ALL THE TYPES OF RATES 
import {
    FETCH_RATES_REQUEST,
    FETCH_RATES_SUCCESS,
    FETCH_RATES_FAILURE,
    ADD_RATE_REQUEST,
    ADD_RATE_SUCCESS,
    ADD_RATE_FAILURE,
    UPDATE_RATE_REQUEST,
    UPDATE_RATE_SUCCESS,
    UPDATE_RATE_FAILURE,
    DELETE_RATE_REQUEST,
    DELETE_RATE_SUCCESS,
    DELETE_RATE_FAILURE,
    SEARCH_RATE_REQUEST,
    SEARCH_RATE_SUCCESS,
    SEARCH_RATE_FAILURE,
} from '../types/rateTypes.jsx';

//MAG-FETCH UG DATA SA RATES NA TABLE
export const fetchRates = () => async dispatch => {
    try {
        dispatch({ type: FETCH_RATES_REQUEST });
        // Perform async operation, e.g., fetch data from an API
        const employees = await MarkBelloApi.get('/api/rates/all');
        dispatch({
            type: FETCH_RATES_SUCCESS,
            payload: employees
        });
    } catch (error) {
        dispatch({
            type: FETCH_RATES_FAILURE,
            payload: error.message
        });
    }
};

//MAG ADD UG RATE
export const addRate = AddRateData => async dispatch => {
    try{
        dispatch({type: ADD_RATE_REQUEST});

        const AddRateRequestResponse = await MarkBelloApi.post('/api/rates/add', AddRateData);

        dispatch({
            type: ADD_RATE_SUCCESS, 
            payload: AddRateRequestResponse
        })

    }catch (error){
        dispatch({
            type: ADD_RATE_FAILURE,
            payload: error.message
        });
    }
};

//MAG UPDATE UG RATES GAMIT ID
export const updateRate = (rateId, updateRateData) => async dispatch => {
    try{
        dispatch({ type: UPDATE_RATE_REQUEST });
        //DATA VARIABLE NA NAGGUNIT UG RESPONSE UG REQUEST
        const updateRateRequestAndResponse = await MarkBelloApi.put(`/api/rates/update/${rateId}`, updateRateData)

        if (!updateRateRequestAndResponse) {
            // Handle the case where the response is empty
            toast.error('Fill-up correctly! 🥺⚠️👽', {
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
            toast.success('Updated Successfully!👌👌👌', {
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
                type: UPDATE_RATE_SUCCESS,
                payload: updateRateRequestAndResponse
            
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
                type: UPDATE_RATE_FAILURE,
                payload: error.message
            });
        }
    }
};

//DEACTIVATE RATES GAMIT ID
export const deactivateRate = rateId => async dispatch => {
    try{
        dispatch({
            type: DELETE_RATE_REQUEST,
        });

        const deactivateRateRequestAndResponse = await MarkBelloApi.put(`/api/rates/deactivate/${rateId}`);

        if (deactivateRateRequestAndResponse.success != true) {
            // Handle the case where the response is empty
            toast.error('Rate has not deactivated! 🥺⚠️👽', {
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
            toast.success('Rate deactivated Successfully!👌👌👌', {
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
                type: DELETE_RATE_SUCCESS,
                payload: deactivateRateRequestAndResponse,
            });
        }
            
    }catch (error){

        dispatch({
            type: DELETE_RATE_FAILURE,
            payload: error.message
        });
    }

};

//SEARCH RATES - Action to search rates
export const searchRates = searchQuery => async dispatch => {
    try {
        dispatch({ type: SEARCH_RATE_REQUEST });

        const searchDeductionRequestAndResponseData = await MarkBelloApi.post('/api/rates/search', searchQuery);

        dispatch({
            type: SEARCH_RATE_SUCCESS,
            payload: searchDeductionRequestAndResponseData
        });
    } catch (error) {
        dispatch({
            type: SEARCH_RATE_FAILURE,
            payload: error.message
        });
    }
};


