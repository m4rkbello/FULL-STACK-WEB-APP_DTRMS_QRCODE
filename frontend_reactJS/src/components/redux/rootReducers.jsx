import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import employeeReducer from './reducers/employeeReducer';
import attendanceReducer from './reducers/attendanceReducer';
import imageReducer from './reducers/imageReducer';


const rootReducer = combineReducers({
    userState: userReducer,
    employeeState: employeeReducer,
    attendanceState: attendanceReducer,
    imageState: imageReducer,
});

export default rootReducer;