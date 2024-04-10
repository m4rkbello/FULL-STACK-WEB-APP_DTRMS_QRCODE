/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../../redux/actions/userAction';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({loginUser}) => {
  const [localEmail, setLocalEmail] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  //PARA SA LOADING REQUEST!
  const [isLoading, setIsLoading] = useState(false);

  //redirect if successful login
  const navigate = useNavigate();

  const handleLoginRequestAndResponse = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try{
      await loginUser({
          user_email: localEmail,
          user_password: localPassword,
      });

      setTimeout(() => {
          window.location.reload();
          navigate("/http://localhost:5173/");
      }, 5000)

    }catch(error) {
      window.alert("ERROR");
    }finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
    <ToastContainer />
    <div className="hero min-h-screen bg-transparent shadow-md">
    <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    <h1 className="text-5xl font-bold text-black">Login now!</h1>
    <p className="py-6 text-black">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-md bg-gradient-to-r from-amber-100 via-black to-black/50 to-black/50">
            <form className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-black">Email</span>
                </label>
                <input type="email" value={localEmail}  onChange={(e) => setLocalEmail(e.target.value)} placeholder="email" className="input input-bordered bg-amber-100 text-black" required />
                </div>
                <div className="form-control">
                <label className="label">
                <span className="label-text text-xl text-black">Password</span>
                </label>
                <input type="password" placeholder="password" value={localPassword} onChange={(e) => setLocalPassword(e.target.value)} className="input input-bordered bg-amber-100 text-black" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover text-black text-xl">Forgot password?</a>
                  </label>
                  </div>
                  <div className="form-control mt-6">
                  <button onClick={handleLoginRequestAndResponse} className="btn bg-gradient-to-r from-black to-black-100 hover:from-black hover:to-amber-100 text-amber-100 hover:text-black  text-2xl">Login</button>
              </div>
              <center>
                  <span id="loading-infinity" className={`loading loading-infinity loading-lg ${isLoading ? 'block' : 'hidden'} spinner-blue`}></span>
              </center>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(null, {loginUser})(Login);
