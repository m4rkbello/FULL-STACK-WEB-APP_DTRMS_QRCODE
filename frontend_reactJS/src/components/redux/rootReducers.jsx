import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import employeeReducer from './reducers/employeeReducer';
import departmentReducer from './reducers/departmentReducer';
import attendanceReducer from './reducers/attendanceReducer';
import imageReducer from './reducers/imageReducer';
import chartReducer from '../../services/chart/chartReducer';
import rateReducer from './reducers/rateReducer';
import payrollReducer from './reducers/payrollReducer';
import overtimeReducer from './reducers/overtimeReducer';
import deductionReducer from './reducers/deductionReducer';


const rootReducer = combineReducers({
  userState: userReducer,
  employeeState: employeeReducer,
  departmentState: departmentReducer,
  attendanceState: attendanceReducer,
  imageState: imageReducer,
  chartState: chartReducer,
  rateState: rateReducer,
  payrollState: payrollReducer,
  overtimeState: overtimeReducer,
  deductionState: deductionReducer,
});

export default rootReducer;