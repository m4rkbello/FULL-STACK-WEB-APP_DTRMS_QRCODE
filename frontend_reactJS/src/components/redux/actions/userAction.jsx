import MarkBelloApi from '../../../services/Api.jsx';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE
} from '../types/userTypes.jsx';

//MAG-FETCH UG USER
export const fetchUsers = () => async dispatch => {
    try {
        dispatch({ type: FETCH_USERS_REQUEST });
        // Perform async operation, e.g., fetch data from an API
        const users = await MarkBelloApi.get('/api/users');
        dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: users
        });
    } catch (error) {
        dispatch({
            type: FETCH_USERS_FAILURE,
            payload: error.message
        });
    }
};

//MAG ADD UG USER 
export const addUser = newUser => async dispatch => {
    try {
        dispatch({ type: ADD_USER_REQUEST });
        // Perform async operation, e.g., send data to an API
        const addedUser = await MarkBelloApi.post(newUser);
        dispatch({
            type: ADD_USER_SUCCESS,
            payload: addedUser
        });
    } catch (error) {
        dispatch({
            type: ADD_USER_FAILURE,
            payload: error.message
        });
    }
};

//MAG UPDATE UG USER GAMIT ID
export const updateUser = (userId, updatedUserData) => async dispatch => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        // Perform async operation, e.g., send updated data to an API
        const updatedUser = await MarkBelloApi.put(userId, updatedUserData);
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: updatedUser
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAILURE,
            payload: error.message
        });
    }
};

//MAG DELETE UG USER
export const deleteUser = userId => async dispatch => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        // Perform async operation, e.g., send delete request to an API
        await MarkBelloApi.delete(userId);
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: userId
        });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAILURE,
            payload: error.message
        });
    }
};


//MAG-REGISTER UG USER 
export const registerUser = userData => async dispatch => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        // Perform async operation, e.g., send registration data to an API
        const registeredUser = await MarkBelloApi.post('/api/register', userData);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: registeredUser
        });
            toast.success('Registration successful!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    
        console.log('Registered user:', registeredUser)

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAILURE,
            payload: error.message
        });

        toast.error('Registration Error!', {
            position: 'top-right',
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
    }
};

export const loginUser = userData => async dispatch => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });
        // Perform async operation, e.g., send login data to an API
        const loggedInUser = await MarkBelloApi.post('/login', userData);
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: loggedInUser
        });
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAILURE,
            payload: error.message
        });
    }
};