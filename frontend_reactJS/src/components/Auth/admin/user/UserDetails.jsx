/* eslint-disable react/no-unknown-property */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaUserEdit, FaSave, FaLongArrowAltLeft } from "react-icons/fa";
import { FcFolder, FcOpenedFolder, FcPlus, FcAcceptDatabase, FcKey, FcUnlock, FcSalesPerformance, FcSearch, FcPrevious, FcViewDetails, FcEmptyTrash, FcNext } from "react-icons/fc";
import { MdEditSquare } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
//redux-actions
import { fetchUsers, updateUser, uploadAndUpdateImageUser } from '../../../redux/actions/userAction';
import { fetchEmployees } from '../../../redux/actions/employeeAction';
import { FaUpload } from "react-icons/fa6";
import { fetchImages } from '../../../redux/actions/imageAction';

const UserDetails = (props) => {
  console.log("DATA SA USER PARA E DISPLAY!", props);
  //FOR AUTHENTICATION-PURPOSES
  const [localStorageHasUserIdData, setLocalStorageHasUserId] = useState('');
  const [sessionStorageHasUserIdData, setSessionStorageHasUserId] = useState('');
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // e enable niya or disabled
  //maghandle sa data sa forms-input
  const [userData, setUserData] = useState({
    user_firstname: '',
    user_lastname: '',
    user_email: '',
    user_contact_no: '',
  });

  //naga hold ug sa formData
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUpdateUser = () => {
    try {
      // Check if userData has any changes 
      const hasChanges = Object.values(userData).some(value => value !== '');

      if (hasChanges) {
        props.updateUser(localStorageHasUserIdData, userData); // Pass updated userData
        setIsEditing(!isEditing); // Toggle editing mode
      } else {
        // No changes detected, toggle editing mode without updating user data
        setIsEditing(!isEditing);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  //NAGBIRAG DATA GIKAN SA PROPS DRILLING
  const usersCollection = props?.users?.data;

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
  console.log("DATA SA isAuthenticatedUser LINE 83", isAuthenticatedUser);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = () => {
    event.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('user_image', image);
      props.uploadAndUpdateImageUser(formData, localStorageHasUserIdData); // Assuming you have access to localStorageHasUserIdData
    }
  };

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

  // if (props.loading) {
  //   return (
  //     <div className="flex flex-col gap-4 w-52">
  //       <div className="flex gap-4 items-center">
  //         <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
  //         <div className="flex flex-col gap-4">
  //           <div className="skeleton h-4 w-20"></div>
  //           <div className="skeleton h-4 w-28"></div>
  //         </div>
  //       </div>
  //       <div className="skeleton h-32 w-full"></div>
  //     </div>
  //   );
  // }

  return (

    <div className="h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">

      <ToastContainer />
      <dialog id="uploadUserUImage" className="modal">
        <div className="modal-box">
          <form method="dialog justify-center">
            <input type="file" onChange={handleImageChange} className="file-input bg-black w-full max-w-xs" />
            <button onClick={handleImageUpload} className="btn btn-primary ml-5">Upload</button>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>

      <div className="flex flex-col bg-transparent mb-10 shadow-slate-900/100" >
        <div className="flex items-center text-sm breadcrumbs">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className='flex items-center hover:text-white'>
                <FcPrevious style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className='flex items-center hover:text-white'>
                <FcFolder
                  style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Users</span>
              </Link>
            </li>
            <li>
              <Link to="" className='flex items-center hover:text-white'>
                <FcOpenedFolder style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Data</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>


      <div className='bg-transparent shadow-slate-900/100'>
        <div className="grid grid-cols-3 items-center mt-10 mb-5 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
          <div>
            <span className="inline-grid grid-cols-3 gap-4 py-5">
              <div className="p-3 flex justify-start">
                <span></span>
              </div>

            </span>
          </div>
          <div className="pb-0 pt-5 flex justify-center">
            <div className="avatar">


              <div className="avatar online">
                <div className="ring-primary ring-offset-base-100 w-40 rounded-full">
                  {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                    <img key={index} 
                    src={user.user_image}
                    className='"input input-bordered shadow-2xl glass text-2xl text-black border-1 border-glass rounded-se-3xl shadow-slate-900/100 custom-placeholder-text-color'
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 flex justify-end">
            <span></span>
          </div>
        </div>
      </div>

      <div className="hero-content flex flex-col items-center">
        <FaUpload
          onClick={() => document.getElementById('uploadUserUImage').showModal()}
          style={{ backgroundColor: 'transparent', color: 'black', border: 'none', width: '35px', height: '35px' }}
        />
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex-1 pr-10 pl-10">
            <div className="grid grid-cols-2 gap-10">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-3xl">Firstname</span>
                </label>
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="text"
                    name="user_firstname"
                    className={`input input-bordered shadow-2xl text-2xl text-black ${isEditing ? '' : 'pointer-events-none'}`}
                    defaultValue={user.user_firstname}
                    onChange={handleUpdateInputChange}
                    disabled={!isEditing} // Disable input when not editing
                  />
                ))}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-3xl">Lastname</span>
                </label>
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="text"
                    name="user_lastname"
                    className={`input input-bordered shadow-2xl text-2xl text-black ${isEditing ? '' : 'pointer-events-none'}`}
                    defaultValue={user.user_lastname}
                    onChange={handleUpdateInputChange}
                    disabled={!isEditing} // Disable input when not editing
                  />
                ))}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-3xl">Email</span>
                </label>
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="text"
                    name="user_email"
                    className={`input input-bordered shadow-2xl text-2xl text-black ${isEditing ? '' : 'pointer-events-none'}`}
                    defaultValue={user.user_email}
                    onChange={handleUpdateInputChange}
                    disabled={!isEditing} // Disable input when not editing
                  />
                ))}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-3xl">Contact</span>
                </label>
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="email"
                    name="user_contact_no"
                    className={`input input-bordered shadow-2xl text-2xl text-black ${isEditing ? '' : 'pointer-events-none'}`}
                    defaultValue={user.user_contact_no}
                    onChange={handleUpdateInputChange}
                    disabled={!isEditing} // Disable input when not editing
                  />
                ))}
              </div>
              {/* Other input fields */}
            </div>
            <br />
            <button onClick={handleUpdateUser} className="btn glass mr-3">
              {isEditing ?
                < FcUnlock
                  style={{
                    backgroundColor: 'transparent', color: 'white', border: 'none',
                    width: '25px', height: '25px'
                  }} /> :
                <FcKey style={{ backgroundColor: 'transparent', color: '#A3E636', border: 'none', width: '25px', height: '25px' }} />
              }
            </button>
            <button className="btn bg-black">
              <Link to="/admin/user/profile-details/change-password">
                <TbPasswordUser
                  style={{ backgroundColor: 'transparent', color: '#A3E636', border: 'none', width: '25px', height: '25px' }}
                />
              </Link>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
