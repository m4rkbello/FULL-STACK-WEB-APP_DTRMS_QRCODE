import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaUserEdit, FaSave, FaLongArrowAltLeft } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";

//redux-actions
import { fetchUsers, uploadAndUpdateImageUser } from '../../../redux/actions/userAction';
import { fetchEmployees } from '../../../redux/actions/employeeAction';


import { FaUpload } from "react-icons/fa6";
import { fetchImages } from '../../../redux/actions/imageAction';
//modal 



const UserDetails = (props) => {
  //FOR AUTHENTICATION-PURPOSES
  const [localStorageHasUserIdData, setLocalStorageHasUserId] = useState('');
  const [sessionStorageHasUserIdData, setSessionStorageHasUserId] = useState('');
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to determine if editing is enabled

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

  return (

    <div className="hero min-h-screen bg-amber-100 rounded-t-lg">
      <button style={{ marginRight: "93%", marginBottom: "65%" }} >
        <Link to="/">
          <FaLongArrowAltLeft style={{ fontSize: "50px", color: "black", marginRight: "90%", marginBottom: "65%" }} />
        </Link>
      </button>
      <ToastContainer />
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
                    className={`input input-bordered shadow-2xl text-2xl bg-amber-100 text-black ${isEditing ? '' : 'pointer-events-none'}`}
                    defaultValue={user.user_firstname}
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
                    className={`input input-bordered shadow-2xl text-2xl bg-amber-100 text-black ${isEditing ? '' : 'pointer-events-none'}`}
                    defaultValue={user.user_lastname}
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
                    className={`input input-bordered shadow-2xl text-2xl bg-amber-100 text-black ${isEditing ? '' : 'pointer-events-none'}`}
                    defaultValue={user.user_email}
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
                    className={`input input-bordered shadow-2xl text-2xl bg-amber-100 text-black ${isEditing ? '' : 'pointer-events-none'}`}
                    defaultValue={user.user_contact_no}
                    disabled={!isEditing} // Disable input when not editing
                  />
                ))}
              </div>
              {/* Other input fields */}
            </div>
            <br />
            <button onClick={() => setIsEditing(!isEditing)} className="btn bg-black mr-3">
              {isEditing ? <FaSave style={{ backgroundColor: 'transparent', color: ' #fef3c6', border: 'none', width: '25px', height: '25px' }} /> 
              :
              <MdEditSquare style={{ backgroundColor: 'transparent', color: '#fef3c6', border: 'none', width: '25px', height: '25px' }} /> }
            </button>
            <button className="btn bg-black">
            <TbPasswordUser 
            style={{ backgroundColor: 'transparent', color: '#fef3c6', border: 'none', width: '25px', height: '25px' }}
            />
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
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchEmployees: () => dispatch(fetchEmployees()),
  fetchImages: () => dispatch(fetchImages()),
  uploadAndUpdateImageUser: (formData, userId) => dispatch(uploadAndUpdateImageUser(formData, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
