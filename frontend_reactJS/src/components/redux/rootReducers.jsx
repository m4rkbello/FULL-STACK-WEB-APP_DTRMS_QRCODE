import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import employeeReducer from './reducers/employeeReducer';
import departmentReducer from './reducers/departmentReducer';
import attendanceReducer from './reducers/attendanceReducer';
import imageReducer from './reducers/imageReducer';
import chartReducer from '../../services/chart/chartReducer';

const rootReducer = combineReducers({
  userState: userReducer,
  employeeState: employeeReducer,
  departmentState: departmentReducer,
  attendanceState: attendanceReducer,
  imageState: imageReducer,
  chartState: chartReducer,
});




export default rootReducer;