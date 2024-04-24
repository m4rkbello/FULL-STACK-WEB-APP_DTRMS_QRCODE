/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

//redux-actions
import { fetchUsers, uploadAndUpdateImageUser } from '../../../redux/actions/userAction';
import { fetchEmployees } from '../../../redux/actions/employeeAction';

import img from '../../../../assets/images/pic-removebg-preview.png'
// import UploadImage from '../modal/UploadImage';
import { FaUpload } from "react-icons/fa6";
import { fetchImages } from '../../../redux/actions/imageAction';
//modal 



const UserDetails = (props) => {
  //FOR AUTHENTICATION-PURPOSES
  const [localStorageHasUserIdData, setLocalStorageHasUserId] = useState('');
  const [sessionStorageHasUserIdData, setSessionStorageHasUserId] = useState('');
  const [image, setImage] = useState(null);

  // console.log("IMAGES DATA", props)

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


  const usersCollection = props?.users;

  function getUserAuthenticated(usersCollection) {
    let item = [];

    // Check if usersCollection is defined and not null
    if (usersCollection && usersCollection.length) {
      for (let ez = 0; ez < usersCollection.length; ez++) {
        if (usersCollection[ez].id == sessionStorageHasUserIdData && usersCollection[ez].id == localStorageHasUserIdData){
          item.push(usersCollection[ez]);
        }
      }
    }
    return item;
  }

  const isAuthenticatedUser = getUserAuthenticated(usersCollection);
  // console.log('FINAL DATA', isAuthenticatedUser);


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = () => {
    event.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('user_image', image);
      // Dispatch the updateImage action with formData and userId
      props.uploadAndUpdateImageUser(formData, localStorageHasUserIdData); // Assuming you have access to localStorageHasUserIdData
    }
  };

  return (

    <div className="hero min-h-screen bg-amber-100 rounded-t-lg">
      <dialog id="uploadUserUImage" className="modal">
        <div className="modal-box">
          <form method="dialog justify-center">
            <input type="file" onChange={handleImageChange} className="file-input bg-amber-100 w-full max-w-xs" />
            <button onClick={handleImageUpload} className="btn btn-primary ml-5">Upload</button>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
      <div className="hero-content flex flex-col items-center">
        {/**
      
      */}
        {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
          <img
            key={index}
            className="mask mask-circle shadow-inner"
            src={user.user_image}
            type="file"
            style={{ backgroundColor: 'transparent', width: '30%', height: '30%' }}
          />
        ))}

        <FaUpload
          onClick={() => document.getElementById('uploadUserUImage').showModal()}
          style={{ backgroundColor: 'transparent', border: 'none', width: '35px', height: '35px' }}

        />

        <div className="hero-content flex-col lg:flex-row">
          <div className="flex">
            <div className="">
              {/**
            */}


            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 gap-0">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Firstname</span>
                </label>
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="text"
                    className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                    defaultValue={user.user_firstname}
                  />
                ))}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="email"
                    className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                    defaultValue={user.user_lastname}
                  />
                ))}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="email"
                    className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                    defaultValue={user.user_email}
                  />
                ))}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="contact no"
                    className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                    defaultValue={user.user_contact_no}

                  />
                ))}
              </div>
            </div>
            <br />
            <button className="btn btn-primary p-5 m-2">Edit Details</button>
            <button className="btn btn-primary p-5">Change Password</button>
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
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchEmployees: () => dispatch(fetchEmployees()),
  fetchImages: () => dispatch(fetchImages()),
  uploadAndUpdateImageUser: (formData, userId) => dispatch(uploadAndUpdateImageUser(formData, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);