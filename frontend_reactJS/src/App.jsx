/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { BiLogOutCircle } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { TiUserAddOutline } from "react-icons/ti";
import { FaUserTie } from "react-icons/fa6";
import { AiFillSetting } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { FaRunning } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { FaUsersSlash } from "react-icons/fa6";
import { RiOrganizationChart } from "react-icons/ri";
//LAYOUTS
import Content from './components/layouts/Content';
import Footer from './components/layouts/Footer';
//ADMIN
import Login from './components/Auth/admin/Login';
import Register from './components/Auth/admin/Register';
import UserDetails from './components/Auth/admin/user/UserDetails';
import UserChangePassword from './components/Auth/admin/user/UserChangePassword';
import ForgotPassword from './components/Auth/admin/ForgotPassword';
import Department from './components/Auth/admin/department/Department';
//EMPLOYEE
import EmployeeRegister from './components/Auth/employee/EmployeeRegister';
import PersonalDetails from './components/Auth/employee/EmployeePersonalDetails';
import EmployeeDashboard from './components/Auth/employee/EmployeeDashboard';
import EmployeePersonalDetails from './components/Auth/employee/EmployeePersonalDetails';
import FourOFourNotFound from './components/Auth/admin/pages/404NotFound';
import ArchiveEmployee from './components/Auth/employee/EmployeeArchieve';
import EmployeeAttendance from './components/Auth/employee/EmployeeAttendance';
import EmployeeChart from './components/Auth/employee/EmployeeChart';
import AddDepartment from './components/Auth/admin/department/AddDepartment';
import EditDepartment from './components/Auth/admin/department/EditDepartment';
import EmployeeScanQRCode from './components/Auth/employee/EmployeeScanQRCode';
//REDUX-DISPATCH ACTIONS
import { fetchUsers } from './components/redux/actions/userAction';
import { fetchEmployees } from './components/redux/actions/employeeAction';
import { fetchAttendances } from './components/redux/actions/attendanceAction';

function App(props) {
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
  const usersCollection = props?.users; // Accessing users array from props

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
                  <Link to="/qrc">
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
        <div className="drawer-content flex flex-col items-center justify-center px-4 py-8 md:px-8 md:py-12">
          {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ?
            (
              <>
                <Routes>
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/admin/user/profile-details/change-password" element={<UserChangePassword />} />
                  <Route path="/admin/user/profile-details" element={<UserDetails />} />
                  <Route path="/employee/register" element={<EmployeeRegister />} />
                  <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                  <Route path="/employee/details/:id" element={<EmployeePersonalDetails />} />
                  <Route path="/archieve" element={<ArchiveEmployee />} />
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
                <Route path="/scan/employee" element={<EmployeeScanQRCode />} />
              </Routes>
            )}

        </div>

        {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ? (
          <>
            <div className="drawer-side border-r-4 border-black">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay "></label>
              <ul className="menu pt-4 pl-4 pr-4 pb-4 w-80 min-h-full bg-zinc-300">
                <li>
                  <Link to="/employee/attendance" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                    <FaRegListAlt />
                  Attendance
                  </Link>
                </li>
                <li>
                  <Link to="/employee/dashboard" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                  <ImUsers />
                  Employees List
                  </Link>
                </li>
                <li>
                  <Link to="/archieve" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                  <FaUsersSlash />
                  Employee Archieve
                  </Link>
                </li>
                <li>
                  <Link to="/content" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                    Content Test
                  </Link>
                </li>
                <li>
                  <Link to="/department" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                  <RiOrganizationChart />
                  Department
                  </Link>
                </li>
                <li>
                  <Link to="" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                    TEST 1
                  </Link>
                </li>
                <li>
                  <Link to="" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                    TEST 2
                  </Link>
                </li>
                <li>
                  <Link to="" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                    TEST 3
                  </Link>
                </li>
                <li>
                  <Link to="" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                    TEST 4
                  </Link>
                </li>
                <li>
                  <Link to="" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                    TEST 5
                  </Link>
                </li>
                <li>
                  <Link to="" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                    TEST
                  </Link>
                </li>
                <li>
                  <Link to="" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                    TEST 6
                  </Link>
                </li>
                <li>
                  <Link to="" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                    TEST 7
                  </Link>
                </li>
                <li>
                  <Link to="" className='text-2xl bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-100 hover:text-black'>
                    TEST 8
                  </Link>
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
