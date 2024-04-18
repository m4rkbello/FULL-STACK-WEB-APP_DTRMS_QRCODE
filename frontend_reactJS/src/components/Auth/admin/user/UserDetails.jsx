/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

//redux-actions
import { fetchUsers } from '../../../redux/actions/userAction';
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
  console.log('FINAL DATA', isAuthenticatedUser);

  return (



    <div className="hero min-h-screen bg-amber-100 rounded-t-lg">
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog justify-center">
            <input type="file" className="file-input bg-amber-100 w-full max-w-xs" />
            <button className="btn btn-primary ml-5">Upload</button>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
      <div className="hero-content flex flex-col items-center">
        {/**
      
      */}
        <img
          className="mask mask-circle"
          src="http://127.0.0.1:8000/images/1713457202.png"
          type="file"
          style={{ backgroundColor: 'transparent', width: '30%', height: '50%' }}
        />
        <button className="btn  bg-transparent" onClick={() => document.getElementById('my_modal_3').showModal()}><FaUpload height={30} width={30} /></button>

        <div className="hero-content flex-col lg:flex-row">
          <div className="flex">
            <div className="">
              {/**
        <img
          src={img}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);