import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaUserEdit, FaSave, FaLongArrowAltLeft } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";

//redux-actions
import { fetchUsers, updateUser, uploadAndUpdateImageUser, userChangePassword } from '../../../redux/actions/userAction';
import { fetchEmployees } from '../../../redux/actions/employeeAction';


import { FaUpload } from "react-icons/fa6";
import { fetchImages } from '../../../redux/actions/imageAction';
//modal 

const UserDetails = (props) => {
  //FOR AUTHENTICATION-PURPOSES
  const [localStorageHasUserIdData, setLocalStorageHasUserId] = useState('');
  const [sessionStorageHasUserIdData, setSessionStorageHasUserId] = useState('');
  const [isEditing, setIsEditing] = useState(false); // e enable niya or disabled
  //maghandle sa data sa forms-input
  const [userData, setUserData] = useState({
    user_password: '',
    confirm_password: '',

  });

  //naga hold ug sa formData
  const handleChangePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleChangePasswordUser = () => {
    try {
      // Check if userData has any changes 
      const hasChanges = Object.values(userData).some(value => value !== '');

      if (hasChanges) {
        props.userChangePassword(localStorageHasUserIdData, userData); // Pass updated userData
        setIsEditing(!isEditing); // Toggle editing mode
        toast.success('User updated successfully.');
      } else {
        // No changes detected, toggle editing mode without updating user data
        setIsEditing(!isEditing);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user. Please try again later.');
    }
  };

  const usersCollection = props?.users;

  function getUserAuthenticated(usersCollection) {
    let item = [];

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

  useEffect(() => {
    //kuhaon ang data sa localStorage/Session Storage/Cookie
    const localStorageHasUserId = localStorage.getItem('DTRMS_BY_M4RKBELLO_USER_ID');
    const sessionStorageHasUserId = sessionStorage.getItem('DTRMS_BY_M4RKBELLO_USER_ID');

    setLocalStorageHasUserId(localStorageHasUserId);
    setSessionStorageHasUserId(sessionStorageHasUserId);

    props.fetchUsers();
    props.fetchEmployees();
    props.fetchImages();

  }, []);

  //para sa loading request if loading ang redux-reducer niya is is user_request
  if (props.loading) {
    return <div>
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </div>;
  }

  return (

    <div className="hero min-h-screen bg-amber-100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
      <button style={{ marginRight: "93%", marginBottom: "65%" }} >
        <Link to="/">
          <FaLongArrowAltLeft style={{ fontSize: "50px", color: "black", marginRight: "90%", marginBottom: "65%" }} />
        </Link>
      </button>
      <ToastContainer />

      <div className="hero-content flex flex-col items-center">

        {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
          <img
            key={index}
            className="mask mask-circle shadow-inner"
            src={user.user_image}
            alt="No Upload User Profile"
            type="file"
            style={{ backgroundColor: 'black', width: '30%', height: '30%' }}
          />
        ))}

        <div className="hero-content flex-col lg:flex-row">
          <div className="flex-1 pr-10 pl-10">
            <div className="grid grid-cols-2 gap-10">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-3xl">Password</span>
                </label>
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="text"
                    name="user_password"
                    className={`input input-bordered shadow-2xl text-2xl bg-amber-100 text-black ${isEditing ? '' : 'pointer-events-none'}`}
                    defaultValue={user.user_password}
                    onChange={handleChangePasswordInputChange}
                    disabled={!isEditing} // Disable input when not editing
                  />
                ))}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-3xl">Confirm Password</span>
                </label>
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="text"
                    name="confirm_password"
                    className={`input input-bordered shadow-2xl text-2xl bg-amber-100 text-black ${isEditing ? '' : 'pointer-events-none'}`}
                    defaultValue={user.user_password}
                    onChange={handleChangePasswordInputChange}
                    disabled={!isEditing} // Disable input when not editing
                  />
                ))}
              </div>
            </div>
            <br />
            <button onClick={handleChangePasswordUser} className="btn bg-black mr-3">
              {isEditing ?
                <FaSave style={{ backgroundColor: 'transparent', color: '#fef3c6', border: 'none', width: '25px', height: '25px' }} /> :
                <MdEditSquare style={{ backgroundColor: 'transparent', color: '#fef3c6', border: 'none', width: '25px', height: '25px' }} />
              }
            </button>
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
  images: state.imageState,
  localStorageHasUserIdData: localStorage.getItem('DTRMS_BY_M4RKBELLO_USER_ID'),
  loading: state.userState.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchEmployees: () => dispatch(fetchEmployees()),
  fetchImages: () => dispatch(fetchImages()),
  uploadAndUpdateImageUser: (formData, userId) => dispatch(uploadAndUpdateImageUser(formData, userId)),
  updateUser: (userId, updatedUserData) => dispatch(updateUser(userId, updatedUserData)),
  userChangePassword: (userId, changePasswordUserData) => dispatch(userChangePassword(userId, changePasswordUserData))

});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
