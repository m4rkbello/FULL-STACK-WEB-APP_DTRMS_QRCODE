/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { BsQrCodeScan } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { TiUserAddOutline } from "react-icons/ti";
import { FaUserTie } from "react-icons/fa6";
import { AiFillSetting } from "react-icons/ai";
import { FaRunning } from "react-icons/fa";
import { FcDoughnutChart, FcOpenedFolder, FcHome, FcTimeline, FcMenu, FcExpired, FcCurrencyExchange, FcButtingIn, FcStatistics, FcManager, FcElectricalThreshold, FcComboChart, FcList, FcSettings, FcConferenceCall, FcReuse, FcDepartment, FcMoneyTransfer, FcOvertime, FcDebt, FcPortraitMode, FcSalesPerformance } from "react-icons/fc";
//LAYOUTS
import Content from './components/layouts/Content';
import Footer from './components/layouts/Footer';
//ADMIN-ROUTES
import Login from './components/Auth/admin/Login';
import Register from './components/Auth/admin/Register';
import PageNotFound from './components/Auth/admin/404/PageNotFound';
import UserDashboard from './components/Auth/admin/user/UserDashboard';
import UserDetails from './components/Auth/admin/user/UserDetails';
import UserChangePassword from './components/Auth/admin/user/UserChangePassword';
import ForgotPassword from './components/Auth/admin/ForgotPassword';
import Dashboard from './components/Auth/admin/Dashboard';
import Payroll from './components/Auth/admin/payroll/Payroll';
import EditPayroll from './components/Auth/admin/payroll/EditPayroll';
import Overtime from './components/Auth/admin/overtime/Overtime';
import EditOvertime from './components/Auth/admin/overtime/EditOvertime';
import Rate from './components/Auth/admin/rate/Rates';
import EditRates from './components/Auth/admin/rate/EditRates';
import Deduction from './components/Auth/admin/deduction/Deduction';
import EditDeduction from './components/Auth/admin/deduction/EditDeduction';
import Departments from './components/Auth/admin/department/Departments';
import EditDepartment from './components/Auth/admin/department/EditDepartment';
//EMPLOYEE-ROUTES
import EmployeeRegister from './components/Auth/employee/EmployeeRegister';
import EmployeeDashboard from './components/Auth/employee/EmployeeDashboard';
import EmployeePersonalDetails from './components/Auth/employee/EmployeePersonalDetails';
import ArchiveEmployee from './components/Auth/employee/EmployeeArchieve';
import EmployeeAttendance from './components/Auth/employee/EmployeeAttendance';
import EmployeeScanQRCode from './components/Auth/employee/EmployeeScanQRCode';
//REDUX-DISPATCH ACTIONS
import { fetchUsers } from './components/redux/actions/userAction';
import { fetchEmployees } from './components/redux/actions/employeeAction';
import { fetchAttendances } from './components/redux/actions/attendanceAction';

function App(props) {
  console.log("DATA SA props", props);
  //FOR AUTHENTICATION-PURPOSES GAMIT TOKEN UG ID SA USERS
  const [localStorageHasUserIdData, setLocalStorageHasUserId] = useState('');
  const [sessionStorageHasUserIdData, setSessionStorageHasUserId] = useState('');
  const [localStorageHasToken, setLocalStorageHasToken] = useState('');
  const [sessionStorageToken, setSessionStorageToken] = useState('');
  const [cookiesData, setCookiesData] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    //kuhaon ang data sa localStorage/Session Storage/Cookie 
    const localStorageHasUserId = localStorage.getItem('DTRMS_BY_M4RKBELLO_USER_ID');
    const sessionStorageHasUserId = sessionStorage.getItem('DTRMS_BY_M4RKBELLO_USER_ID');
    const localStorageHasTokenData = localStorage.getItem('DTRMS_BY_M4RKBELLO');
    const sessionStorageHasTokenData = sessionStorage.getItem('DTRMS_BY_M4RKBELLO');
    const cookiesData = document.cookie;

    setLocalStorageHasUserId(localStorageHasUserId);
    setSessionStorageHasUserId(sessionStorageHasUserId);
    setLocalStorageHasToken(localStorageHasTokenData);
    setSessionStorageToken(sessionStorageHasTokenData);
    setCookiesData(cookiesData);

    props.fetchUsers();
    props.fetchEmployees();
    props.fetchAttendances();
  }, []);

  const destroyAuthentications = () => {
    localStorage.clear();
    sessionStorage.clear();
    // Remove cookies
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    
    window.location.reload();
    navigate("/");
  };

  // const usersCollection = props && props.users && props.users.data;
  const usersCollection = props?.users?.data; // Accessing users array from props

  // console.log("ID CHOI", usersCollection);
  function getUserAuthenticated(usersCollection) {
    let item = [];

    // Check if usersCollection is defined and not null
    if (usersCollection && usersCollection.length) {
      for (let ez = 0; ez < usersCollection.length; ez++) {
        if (usersCollection[ez].id == sessionStorageHasUserIdData && usersCollection[ez].id == localStorageHasUserIdData) {
          item.push(usersCollection[ez]);
        }
      }
    }
    return item;
  }

  const isAuthenticatedUser = getUserAuthenticated(usersCollection);

  return (
    <div className="flex flex-col h-screen">
      <div className="navbar bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 px-4 py-2 md:px-8 md:py-4 border-r-4 border-black">
        {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ? (
          <>
            <div className="flex-none">
              <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="btn btn-ghost text-xl md:text-2xl text-black">Welcome!
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <span className='text-2xl' key={index}>
                    {user.user_email}
                  </span>
                ))}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1">
              <span className="btn btn-ghost text-4xl text-zinc-400 border-b-4 border-black">DTRMS+</span>
            </div>
          </>
        )}

        {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                    <img
                      key={index}
                      alt="No Upload User Profile"
                      src={user.user_image}
                    />
                  ))}
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-box w-52">
                <li>
                  <span className="justify-between text-black">
                    <FaUserTie
                      style={{ fontSize: "25px", color: "white" }}
                    />
                    <span style={{ fontSize: "20px", color: "white", textAlign: "left" }}>
                      Profile
                    </span>
                    <span className="badge bg-black">
                      <span className='text-white'>
                        <Link to="/admin/user/profile-details">
                          Open
                        </Link>
                      </span>
                    </span>
                  </span>
                </li>
                <li className='text-black'>
                  <span className="justify-between text-black">
                    <AiFillSetting
                      style={{ fontSize: "25px", color: "white" }}
                    />
                    <span style={{ fontSize: "20px", color: "white", textAlign: "left" }}>
                      Settings
                    </span>
                    <span className="badge bg-black">
                      <span className='text-white'>
                        <Link to="">
                          Open
                        </Link>
                      </span>
                    </span>
                  </span>

                </li>
                <li className='text-black' onClick={destroyAuthentications}>
                  <span className="flex justify-between items-center text-black">
                    <FaRunning
                      style={{ fontSize: "25px", color: "white" }}
                    />
                    <span style={{ fontSize: "20px", color: "white" }}>
                      Logout
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div>
              <ul className="menu menu-horizontal drop-shadow-xl  px-1 text-black bg-transparent border-b-4">
                <li className='shadow-2xl text-2xl'>
                  <Link to="/attendance/scan">
                    <BsQrCodeScan />
                  </Link>
                </li>
                <li className='shadow-2xl text-2xl'>
                  <Link to="/admin/login">
                    <FaSignInAlt />
                  </Link>
                </li>
                <li className='shadow-2xl text-2xl'>
                  <Link to="/admin/register">
                    <TiUserAddOutline />
                  </Link>
                </li>
                <li className='shadow-2xl text-2xl'>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="drawer lg:drawer-open flex-1">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center px-4 py-4 md:px-8 md:py-8">
          {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ?
            (
              <>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/admin/users" element={<UserDashboard />} />
                  <Route path="/admin/user/profile-details/change-password/:userId" element={<UserChangePassword />} />
                  <Route path="/admin/user/profile-details" element={<UserDetails />} />
                  <Route path="/admin/payrolls" element={<Payroll />} />
                  <Route path="/admin/payroll/edit/:payrollId" element={<EditPayroll />} />
                  <Route path="/admin/rates" element={<Rate />} />
                  <Route path="/admin/rate/edit/:rateId" element={<EditRates />} />
                  <Route path="/admin/overtimes" element={<Overtime />} />
                  <Route path="/admin/overtime/edit/:overtimeId" element={<EditOvertime />} />
                  <Route path="/admin/deductions" element={<Deduction />} />
                  <Route path="/admin/deduction/edit/:deductionId" element={<EditDeduction />} />
                  <Route path="/admin/departments" element={<Departments />} />
                  <Route path="/admin/department/edit/:departmentId" element={<EditDepartment />} />
                  <Route path="/employee/register" element={<EmployeeRegister />} />
                  <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                  <Route path="/employee/details/:employeeId" element={<EmployeePersonalDetails />} />
                  <Route path="/employee/archieve" element={<ArchiveEmployee />} />
                  <Route path="/employee/attendance" element={<EmployeeAttendance />} />
                  <Route path="/employee/attendance" element={<EmployeeAttendance />} />
                  <Route path="/content" element={<Content />} />
                </Routes>
              </>
            ) : (
              <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/register" element={<Register />} />
                <Route path="/attendance/scan" element={<EmployeeScanQRCode />} />
                <Route path="/" element={<PageNotFound />} />
              </Routes>
            )}
        </div>

        {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ? (
          <>
            <div className="drawer-side border-r-4 glass border-black">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu w-64 md:w-80 min-h-full glass">
                <li>
                  <details close>
                    <summary className='glass'>
                      <FcTimeline
                        style={{
                          height: "2.5rem",
                          width: "2.5rem",
                        }}
                      />
                      <span className='text-2xl'>
                        MAIN
                      </span>
                    </summary>
                    <ul>
                      <li>
                        <Link to="/" className='text-2xl glass'>
                          <FcComboChart
                            style={{
                              height: "2rem",
                              width: "2rem",
                            }}
                          />
                          <span className='text-lg'>
                            ANALYTICS&MONITORING
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/employee/attendance" className='text-2xl glass'>
                          <FcStatistics
                            style={{
                              height: "2rem",
                              width: "2rem",
                            }}
                          />
                          <span className='text-lg'>
                            ATTENDANCE LIST
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/employee/dashboard" className='text-2xl glass'>
                          <FcButtingIn
                            style={{
                              height: "2rem",
                              width: "2rem",
                            }}
                          />
                          <span className='text-lg'>
                            EMPLOYEES LIST
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/employee/archieve" className='text-2xl glass'>
                          <FcReuse
                            style={{
                              height: "2rem",
                              width: "2rem",
                            }}
                          />
                          <span className='text-lg'>
                            EMPLOYEES ARCHIEVE
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/departments" className='text-2xl glass'>
                          <FcDepartment
                            style={{
                              height: "2rem",
                              width: "2rem",
                            }}
                          />
                          <span className='text-lg'>
                            DEPARTMENTS
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/payrolls" className='text-2xl glass'>
                          <FcCurrencyExchange
                            style={{
                              height: "2rem",
                              width: "2rem",
                            }}
                          />
                          <span className='text-lg'>
                            PAYROLLS
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/rates" className='text-2xl glass'>
                          <FcSalesPerformance
                            style={{
                              height: "2.5rem",
                              width: "2.5rem",
                            }}
                          />
                          <span className='text-lg'>
                            RATES
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/overtimes" className='text-2xl glass'>
                          <FcOvertime
                            style={{
                              height: "2.5rem",
                              width: "2.5rem",
                            }}
                          />
                          <span className='text-lg'>
                            OVERTIMES
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/deductions" className='text-2xl glass'>
                          <FcExpired
                            style={{
                              height: "2.5rem",
                              width: "2.5rem",
                            }}
                          />
                          <span className='text-lg'>
                            DEDUCTIONS
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <Link to="/" className='text-2xl glass'>
                    <FcDoughnutChart
                      style={{
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />
                    DASHBOARD
                  </Link>
                </li>
                <li>
                  <Link to="/employee/attendance" className='text-2xl glass'>
                    <FcElectricalThreshold
                      style={{
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />
                    ATTENDANCE
                  </Link>
                </li>
                <li>
                  <Link to="/employee/dashboard" className='text-2xl glass'>
                    <FcConferenceCall
                      style={{
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />
                    EMPLOYEES
                  </Link>
                </li>
                <li>
                  <Link to="/employee/archieve" className='text-2xl glass'>
                    <FcReuse
                      style={{
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />
                    EMPLOYEES ARCH.
                  </Link>
                </li>
                <li>
                  <Link to="/admin/departments" className='text-2xl glass'>
                    <FcDepartment
                      style={{
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />
                    DEPARTMENTS
                  </Link>
                </li>
                <li>
                  <Link to="/admin/payrolls" className='text-2xl glass'>
                    <FcMoneyTransfer
                      style={{
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />
                    PAYROLLS
                  </Link>
                </li>
                <li>
                  <Link to="/admin/rates" className='text-2xl glass'>
                    <FcSalesPerformance
                      style={{
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />
                    RATES
                  </Link>
                </li>
                <li>
                  <Link to="/admin/overtimes" className='text-2xl glass'>
                    <FcOvertime
                      style={{
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />
                    OVERTIMES
                  </Link>
                </li>
                <li>
                  <Link to="/admin/deductions" className='text-2xl glass'>
                    <FcDebt
                      style={{
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />
                    DEDUCTIONS
                  </Link>
                </li>
                <li>
                  <details close>
                    <summary>
                      <FcSettings
                        style={{
                          height: "2.5rem",
                          width: "2.5rem",
                        }}
                      />
                      <span className='text-2xl'>
                        MANAGE USERS
                      </span>
                    </summary>
                    <ul>
                      <li>
                        <a>
                          <FcManager
                            style={{
                              height: "2.5rem",
                              width: "2.5rem",
                            }}
                          />
                          <span className='text-2xl'>
                            USER
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <FcList
                            style={{
                              height: "2.5rem",
                              width: "2.5rem",
                            }}
                          />
                          <span className='text-2xl'>
                            USER LIST
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <FcList
                            style={{
                              height: "2.5rem",
                              width: "2.5rem",
                            }}
                          />
                          <span className='text-2xl'>
                            USERS TYPE
                          </span>
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>


          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.userState.users.data,
    employees: state.employees,
    attendances: state.attendances
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchEmployees: () => dispatch(fetchEmployees()),
    fetchAttendances: () => dispatch(fetchAttendances()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
