/* eslint-disable react-hooks/rules-of-hooks */
import MarkBelloApi from '../../../services/Api.jsx';
// import { useNavigate } from 'react-router-dom';
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
    UPLOAD_AND_UPDATE_EMPLOYEE_REQUEST,
    UPLOAD_AND_UPDATE_EMPLOYEE_SUCCESS,
    UPLOAD_AND_UPDATE_EMPLOYEE_FAILURE,
} from '../types/employeeTypes.jsx';


//MAG-FETCH UG EMPLOYEES DATA
export const fetchEmployees = () => async dispatch => {
    try {
        dispatch({ type: FETCH_EMPLOYEES_REQUEST });
        // Perform async operation, e.g., fetch data from an API
        const employees = await MarkBelloApi.get('/api/employees');
        console.log("DATA SA employees EmployeeAction", employees);
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
export const addEmployee = AddEmployeeData => async dispatch => {
    try {
        dispatch({ type: ADD_EMPLOYEE_REQUEST });

        const addEmployeeRequestResponse = await MarkBelloApi.post('/api/employee-registration', AddEmployeeData);

        dispatch({
            type: ADD_EMPLOYEE_SUCCESS,
            payload: addEmployeeRequestResponse
        });

    } catch (error) {
        
        dispatch({
            type: ADD_EMPLOYEE_FAILURE,
            payload: error.message
        });

    }
};

//MAG UPDATE UG EMPLOYEE GAMIT ID
export const updateEmployee = (employeeId, updateEmployeeData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_EMPLOYEE_REQUEST });

        const updateEmployeeResponse = await MarkBelloApi.put(`/api/employee/${employeeId}`, updateEmployeeData);

        //TANAWON NATO UGG NAA BAY RESPONSE
        console.log(updateEmployeeResponse);

        if (!updateEmployeeResponse) {
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
                    fontSize: '15px',
                },
            });
        } else {
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
                    fontSize: '15px',
                },
            });

            dispatch({
                type: UPDATE_EMPLOYEE_SUCCESS,
                payload: updateEmployeeResponse,
            });

            return updateEmployeeResponse;
        }
    } catch (error) {
        console.log("ERROR SA CATCH SA UPDATE EMPLOYEE", error);
        if (error.response && (error.response.status !== 200 || error.response.status !== 201)) {
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
                    fontSize: '15px',
                },
            });
        }

        dispatch({
            type: UPDATE_EMPLOYEE_FAILURE,
            payload: error.message,
        });
    }
};

//REDUX-ACTION DISPATCH - FLAG TO 0 OR DELETE DEPENDE SA USECASE
export const deactivateEmployee = employeeId => async dispatch => {
    try {
        dispatch({ type: DELETE_EMPLOYEE_REQUEST });
    
       const deactivateEmployeeReqAndRes = await MarkBelloApi.put(`/api/employee/deactivated/${employeeId}`);
       console.log("DATA", deactivateEmployeeReqAndRes);

        if (deactivateEmployeeReqAndRes.success != true) {
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
                type: DELETE_EMPLOYEE_SUCCESS,
                payload: deactivateEmployeeReqAndRes
            });
        }

    } catch (error) {
        dispatch({
            type: DELETE_EMPLOYEE_FAILURE,
            payload: error.message
        });
    }
};

//REDUX-ACTION DISPATCH - UPLOAD UG IMAGE UG UPDATE - METHOD POST
export const uploadAndUpdateImageEmployee = (formData, employeeId) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_AND_UPDATE_EMPLOYEE_REQUEST });
        
        const uploadAndUpdateImageEmpReqRes = await MarkBelloApi.post(`/api/employee/image/${employeeId}`, formData, {
            headers: {
                'Content-Type':'multipart/form-data',
            },
        });

        console.log("DATA", uploadAndUpdateImageEmpReqRes);

        if (uploadAndUpdateImageEmpReqRes.data.success === false) {
            // Display error toast if the upload was unsuccessful
            toast.error(uploadAndUpdateImageEmpReqRes.data.message,'!🥺😱😣', {
                position: 'top-right',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: '#fef3c7',
                    color: 'red',
                    fontSize: '20px'
                }
            });
        } else {
            // Display success toast if the upload was successful
            toast.success('Employee Image upload successfully!🤭😇🤗', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: '#fef3c7',
                    color: 'green',
                    fontSize: '17px'
                }
            });

            // Dispatch the success action only if the upload was successful
            dispatch({
                type: UPLOAD_AND_UPDATE_EMPLOYEE_SUCCESS,
                payload: uploadAndUpdateImageEmpReqRes.data.employee_image // Use the correct response object
            });

            // Reload or navigate after a successful upload, not needed if error occurs

        }
    } catch(error) {
        dispatch({
            type: UPLOAD_AND_UPDATE_EMPLOYEE_FAILURE,
            payload: error.message,
        });
    }
};


