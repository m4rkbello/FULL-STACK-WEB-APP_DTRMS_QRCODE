/* eslint-disable react-hooks/rules-of-hooks */
import MarkBelloApi from '../../../services/Api.jsx';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


import { 
FETCH_DEPARTMENTS_REQUEST,
FETCH_DEPARTMENTS_SUCCESS,
FETCH_DEPARTMENTS_FAILURE,
ADD_DEPARTMENT_FAILURE,
ADD_DEPARTMENT_REQUEST,
ADD_DEPARTMENT_SUCCESS,
DEACTIVATE_DEPARTMENT_FAILURE,
DEACTIVATE_DEPARTMENT_REQUEST,
DEACTIVATE_DEPARTMENT_SUCCESS,
DELETE_DEPARTMENT_FAILURE,
DELETE_DEPARTMENT_REQUEST,
DELETE_DEPARTMENT_SUCCESS,
UPDATE_DEPARTMENT_FAILURE,
UPDATE_DEPARTMENT_REQUEST,
UPDATE_DEPARTMENT_SUCCESS }
from '../types/departmentTypes.jsx';


//MAG-FETCH UG DATA SA DEPARTMENTS
export const fetchDepartments = () => async dispatch => {
    try {
        dispatch({ type: FETCH_DEPARTMENTS_REQUEST });
        // Perform async operation, e.g., fetch data from an API
        const fetchDeptReqRes = await MarkBelloApi.get('/api/department/view/all');
        dispatch({
            type: FETCH_DEPARTMENTS_SUCCESS,
            payload: fetchDeptReqRes
        });
    } catch (error) {
        dispatch({
            type: FETCH_DEPARTMENTS_FAILURE,
            payload: error.message
        });
    }
};

//MAG ADD UG EMPLOYEE 
export const addDepartment = departmentData => async dispatch => {
    try {
        dispatch({ type: ADD_DEPARTMENT_REQUEST });
        const addDepartmentRequestAndResponse = await MarkBelloApi.post('/api/department/create', departmentData);

        if (!addDepartmentRequestAndResponse.data.success) {
            // Handle the case where the response is empty
            toast.error('Employee not added! 🥺⚠️👽', {
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
            toast.success('Employee Added Successfully!👌👌👌', {
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
        }
        
        // setTimeout(() => {
        //     window.location.reload();
        //     // updateEmployeeNavigator("http://localhost:5173/employee/dashboard"); // Use navigate here
        //   })

    
        dispatch({
            type: ADD_DEPARTMENT_SUCCESS,
            payload: addDepartmentRequestAndResponse,
        });
    } catch (error) {
        dispatch({
            type: ADD_DEPARTMENT_FAILURE,
            payload: error.message
        });
    }
};

//MAG UPDATE UG EMPLOYEE GAMIT ID
export const updateDepartment = (deptartmentId, updateDepartmentData) => async dispatch => {
   
    try {
        dispatch({ type: UPDATE_DEPARTMENT_REQUEST });
        // Perform async operation, e.g., send updated data to an API
        document.getElementById('loading-infinity').classList.add('loading', 'loading-infinity', 'loading-lg');
        const updateDeptResponseRequest = await MarkBelloApi.put(`/api/department/update/${deptartmentId}`, updateDepartmentData);

        if (!updateDeptResponseRequest) {
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
            
            // setTimeout(() => {
            //     window.location.reload();
            //     updateEmployeeNavigator("http://localhost:5173/employee/dashboard"); // Use navigate here
            //   })

            dispatch({
                type: UPDATE_DEPARTMENT_SUCCESS,
                payload: updateDeptResponseRequest,
            });

        }
    } catch (error) {
        console.log("ERROR SA CATCH SA UPDATE EMPLOYEE", error);
        // Check if the error object has a response and the status code is 500
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
                type: UPDATE_DEPARTMENT_FAILURE,
                payload: error.message
            });
        }
    }
};

//REDUX-ACTION DISPATCH - FLAG TO 0 OR DELETE DEPENDE SA USECASE
export const deactivateDepartment = departmentId => async dispatch => {
    try {
        dispatch({ type: DEACTIVATE_DEPARTMENT_REQUEST });
    
       const deactivateDepartmentRequestAndResponse = await MarkBelloApi.put(`/api/department/deactivate/${departmentId}`);
       console.log("DATA", deactivateEmployeeReqAndRes);

        if (deactivateDepartmentRequestAndResponse.success != true) {
            // Handle the case where the response is empty
            toast.error('Employee not deactivated! 🥺⚠️👽', {
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
            toast.success('Employee deactivated Successfully!👌👌👌', {
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
            
            // setTimeout(() => {
            //     window.location.reload();
            //     updateEmployeeNavigator("http://localhost:5173/employee/dashboard"); // Use navigate here
            //   })

            dispatch({
                type: DEACTIVATE_DEPARTMENT_SUCCESS,
                payload: deactivateDepartmentRequestAndResponse
            });
        }

    } catch (error) {
        dispatch({
            type: DEACTIVATE_DEPARTMENT_FAILURE,
            payload: error.message
        });
    }
};

//REDUX-ACTION DISPATCH - UPLOAD UG IMAGE UG UPDATE - METHOD POST
export const deleteDepartment = departmentId => async dispatch => {
    try {
        dispatch({ type: DELETE_DEPARTMENT_REQUEST });
    
       const deleteDepartmentRequestAndResponse = await MarkBelloApi.delete(`/api/department/deactivate/${departmentId}`);
       console.log("DATA", deleteDepartmentRequestAndResponse);

        if (deleteDepartmentRequestAndResponse.success != true) {
            // Handle the case where the response is empty
            toast.error('Employee not deactivated! 🥺⚠️👽', {
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
            toast.success('Employee deactivated Successfully!👌👌👌', {
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
            
            // setTimeout(() => {
            //     window.location.reload();
            //     updateEmployeeNavigator("http://localhost:5173/employee/dashboard"); // Use navigate here
            //   })

            dispatch({
                type: DELETE_DEPARTMENT_SUCCESS,
                payload: deleteDepartmentRequestAndResponse
            });
        }

    } catch (error) {
        dispatch({
            type: DELETE_DEPARTMENT_FAILURE,
            payload: error.message
        });
    }
};