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
import { FcDoughnutChart, FcOpenedFolder, FcManager, FcElectricalThreshold, FcConferenceCall, FcReuse, FcDepartment, FcMoneyTransfer, FcOvertime, FcDebt, FcFolder, FcPortraitMode } from "react-icons/fc";
//LAYOUTS
import Content from './components/layouts/Content';
import Footer from './components/layouts/Footer';
//ADMIN-ROUTES
import Login from './components/Auth/admin/Login';
import Register from './components/Auth/admin/Register';
import UserDashboard from './components/Auth/admin/user/UserDashboard';
import UserDetails from './components/Auth/admin/user/UserDetails';
import UserChangePassword from './components/Auth/admin/user/UserChangePassword';
import ForgotPassword from './components/Auth/admin/ForgotPassword';
import Department from './components/Auth/admin/department/Department';
import Dashboard from './components/Auth/admin/Dashboard';
import Payroll from './components/Auth/admin/payroll/Payroll';
import Rate from './components/Auth/admin/rate/Rates';
import Overtime from './components/Auth/admin/overtime/Overtime';
import Deduction from './components/Auth/admin/deduction/Deduction';
//EMPLOYEE-ROUTES
import EmployeeRegister from './components/Auth/employee/EmployeeRegister';
import PersonalDetails from './components/Auth/employee/EmployeePersonalDetails';
import EmployeeDashboard from './components/Auth/employee/EmployeeDashboard';
import EmployeePersonalDetails from './components/Auth/employee/EmployeePersonalDetails';
import ArchiveEmployee from './components/Auth/employee/EmployeeArchieve';
import EmployeeAttendance from './components/Auth/employee/EmployeeAttendance';
import AddDepartment from './components/Auth/admin/department/AddDepartment';
import EditDepartment from './components/Auth/admin/department/EditDepartment';
import EmployeeScanQRCode from './components/Auth/employee/EmployeeScanQRCode';
//REDUX-DISPATCH ACTIONS
import { fetchUsers } from './components/redux/actions/userAction';
import { fetchEmployees } from './components/redux/actions/employeeAction';
import { fetchAttendances } from './components/redux/actions/attendanceAction';

function App(props) {
  console.log("DATA SA PROPS", props);
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
    //para sa localStorage
    localStorage.clear();
    //para sa sessionStorage
    sessionStorage.clear();
    //para sa cookies
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    window.location.reload();
    navigate("/http://localhost:5173/");
  }

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
  console.log("DATA SA isAuthenticatedUser", isAuthenticatedUser);

  return (
    <div className="flex flex-col h-screen">
      <div className="navbar bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  px-4 py-2 md:px-8 md:py-4  border-r-4 border-black">
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
            <div className="flex-1">
              <span className="btn btn-ghost text-2xl text-black">Welcome!
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
        <div className="drawer-content flex flex-col items-center justify-center px-4 py-4 md:px-4 md:py-4">
          {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ?
            (
              <>
                <Routes>
                <Route path="/" element={<Dashboard />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/admin/users" element={<UserDashboard />} />
                  <Route path="/admin/user/profile-details/change-password" element={<UserChangePassword />} />
                  <Route path="/admin/user/profile-details" element={<UserDetails />} />
                  <Route path="/admin/payrolls" element={<Payroll />} />
                  <Route path="/admin/rates" element={<Rate />} />
                  <Route path="/admin/overtimes" element={<Overtime />} />
                  <Route path="/admin/deductions" element={<Deduction />} />

                  <Route path="/employee/register" element={<EmployeeRegister />} />
                  <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                  <Route path="/employee/details/:id" element={<EmployeePersonalDetails />} />
                  <Route path="/employee/archieve" element={<ArchiveEmployee />} />
                  <Route path="/employee/attendance" element={<EmployeeAttendance />} />
                  <Route path="/department" element={<Department />} />
                  <Route path="/department/add" element={<AddDepartment />} />
                  <Route path="/department/edit/:id" element={<EditDepartment />} />
                  <Route path="/content" element={<Content />} />
                </Routes>
              </>
            ) : (
              <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/register" element={<Register />} />
                <Route path="/details" element={<PersonalDetails />} />
                <Route path="/attendance/scan" element={<EmployeeScanQRCode />} />
              </Routes>
            )}
        </div>

        {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ? (
          <>
          <div className="drawer-side border-r-4 glass border-black">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu w-80 min-h-full glass">
            <ul className="menu menu-xs bg-base-200 rounded-lg w-full max-w-xs">

            <li>
              <details open>
                <summary>
                <FcOpenedFolder
                                      style={{
                                        backgroundColor: "transparent",
                                        color: "black",
                                        height: "25px",
                                        width: "25px",
                                    }}
                            />
                  ADMIN
                </summary>
                <ul>
                  <li>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      Project-final.psd
                    </a>
                  </li>
                  <li>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      Project-final-2.psd
                    </a>
                  </li>
                  <li>
                    <details open>
                      <summary>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                        Images
                      </summary>
                      <ul>
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Screenshot1.png
                          </a>
                        </li>
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Screenshot2.png
                          </a>
                        </li>
                        <li>
                          <details open>
                            <summary>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                              </svg>
                              Others
                            </summary>
                            <ul>
                              <li>
                                <a>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-4 w-4">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                  </svg>
                                  Screenshot3.png
                                </a>
                              </li>
                            </ul>
                          </details>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                reports-final-2.pdf
              </a>
            </li>
          </ul>
              <li>
                <Link to="/" className='text-2xl glass'>
                  <FcDoughnutChart 
                    style={{ 
                      height: "120%",
                      width: "120%",
                    }} 
                  />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/employee/attendance" className='text-2xl glass'>
                  <FcElectricalThreshold
                    style={{ 
                      height: "120%",
                      width: "120%",
                    }} 
                  />
                  Attendance
                </Link>
              </li>
              <li>
                <Link to="/employee/dashboard" className='text-2xl glass'>
                  <FcConferenceCall
                    style={{ 
                      height: "120%",
                      width: "120%",
                    }} 
                  />
                  Employees List
                </Link>
              </li>
              <li>
                <Link to="/employee/archieve" className='text-2xl glass'>
                  <FcReuse
                    style={{ 
                      height: "120%",
                      width: "120%",
                    }} 
                  />
                  Employee Archieve
                </Link>
              </li>
              <li>
                <Link to="/department" className='text-2xl glass'>
                  <FcDepartment
                    style={{ 
                      height: "120%",
                      width: "120%",
                    }} 
                  />
                  Department
                </Link>
              </li>
              <li>
                <Link to="/admin/payrolls" className='text-2xl glass'>
                  <FcMoneyTransfer
                    style={{ 
                      height: "120%",
                      width: "120%",
                    }} 
                  />
                  Payrolls
                </Link>
              </li>
              <li>
                <Link to="/admin/rates" className='text-2xl glass'>
                  <FcMoneyTransfer
                    style={{ 
                      height: "120%",
                      width: "120%",
                    }} 
                  />
                  Rates
                </Link>
              </li>
              <li>
                <Link to="/admin/overtimes" className='text-2xl glass'>
                  <FcOvertime
                    style={{ 
                      height: "120%",
                      width: "120%",
                    }} 
                  />
                  Overtime
                </Link>
              </li>
              <li>
                <Link to="/admin/deductions" className='text-2xl glass'>
                  <FcDebt
                    style={{ 
                      height: "120%",
                      width: "120%",
                    }} 
                  />
                  Deduction
                </Link>
              </li>
              <li>
                <Link to="" className='text-2xl glass'>
                  TEST 5
                </Link>
              </li>
              <li>
                <Link to="" className='text-2xl glass'>
                  TEST
                </Link>
              </li>
              <li>
                <Link to="" className='text-2xl glass'>
                  TEST 6
                </Link>
              </li>
              <li>
                <Link to="" className='text-2xl glass'>
                  TEST 7
                </Link>
              </li>
              <li>
                <Link to="/admin/users" className='text-2xl glass'>
                  <FcPortraitMode 
                    style={{ 
                      height: "120%",
                      width: "120%",
                    }} 
                  />
                  Deduction
                </Link>
              </li>
              <li>
              <details open>
                <summary>
                <FcOpenedFolder
                      style={{
                        backgroundColor: "transparent",
                        color: "black",
                        height: "25px",
                        width: "25px",
                    }}
                    />
                  MANAGE USERS
                </summary>
                <ul>
                  <li>
                    <a>
                    <FcManager
                      style={{
                        backgroundColor: "transparent",
                        color: "black",
                        height: "25px",
                        width: "25px",
                    }}
                    />
                  ADD USER
                    </a>
                  </li>
                  <li>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      Project-final-2.psd
                    </a>
                  </li>
                  <li>
                    <details open>
                      <summary>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                        Images
                      </summary>
                      <ul>
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Screenshot1.png
                          </a>
                        </li>
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Screenshot2.png
                          </a>
                        </li>
                        <li>
                          <details open>
                            <summary>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                              </svg>
                              Others
                            </summary>
                            <ul>
                              <li>
                                <a>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-4 w-4">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                  </svg>
                                  Screenshot3.png
                                </a>
                              </li>
                            </ul>
                          </details>
                        </li>
                      </ul>
                    </details>
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
