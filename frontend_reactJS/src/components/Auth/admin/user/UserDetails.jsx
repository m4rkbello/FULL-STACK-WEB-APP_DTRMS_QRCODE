/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//redux-actions
import { fetchUsers } from '../../../redux/actions/userAction';
import { fetchEmployees } from '../../../redux/reducers/employeeReducer';
import { fetchAttendances } from '../../../redux/reducers/attendanceReducer';

const UserDetails = ({
  users,
  fetchUsers,
  fetchEmployees,
  fetchAttendances,
}) => {
  //FOR AUTHENTICATION-PURPOSES
  const [localStorageHasUserIdData, setLocalStorageHasUserId] = useState('');
  const [sessionStorageHasUserIdData, setSessionStorageHasUserId] = useState('');

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

    console.log('ID SA LOCALSTORAGE', localStorageHasUserId);
    console.log('ID SA SESSION STORAGE', sessionStorageHasUserId);
    console.log('ID SA COOKIE', cookiesData);

    fetchUsers();
    fetchEmployees();
    fetchAttendances();
  }, [fetchUsers, fetchEmployees, fetchAttendances]);

  function getUserAuthenticated(usersCollection) {
    let item = [];

    // Check if usersCollection is defined and not null
    if (usersCollection && usersCollection.length) {
      for (let ez = 0; ez < usersCollection.length; ez++) {
        if (
          usersCollection[ez].id == sessionStorageHasUserIdData &&
          usersCollection[ez].id == localStorageHasUserIdData
        ) {
          item.push(usersCollection[ez]);
        }
      }
    }

    return item;
  }

  const isAuthenticatedUser = getUserAuthenticated(users);
  console.log('FINAL DATA', isAuthenticatedUser);

  return (
    <div className="hero min-h-screen bg-amber-100">
      <div className="hero-content flex flex-col items-center">
        <img
          className="mask mask-circle mb-6"
          src="https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg"
        />
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex">
            <div className="">
              <img
                src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                className="max-w-sm rounded-lg shadow-2xl"
              />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <span className="text-2xl" key={index}>
                    {user.user_email}
                  </span>
                ))}
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <br />
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.userState.users.data,
  employees: state.employees,
  attendances: state.attendances,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchEmployees: () => dispatch(fetchEmployees()),
  fetchAttendances: () => dispatch(fetchAttendances()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);