import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import employeeReducer from './reducers/employeeReducer';
import attendanceReducer from './reducers/attendanceReducer';

const rootReducer = combineReducers({
    userState: userReducer,
    employeeState: employeeReducer,
    attendanceState: attendanceReducer
});

export default rootReducer;