/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/userAction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ loginUser }) => {
  const [localEmail, setLocalEmail] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  //PARA SA LOADING REQUEST!
  const [isLoading, setIsLoading] = useState(false);

  //redirect if successful login
  const navigate = useNavigate();

  const handleLoginRequestAndResponse = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await loginUser({
        user_email: localEmail,
        user_password: localPassword,
      });

      // setTimeout(() => {
      //   window.location.reload();
      //   navigate("/http://localhost:5173/");
      // }, 3000)

    } catch (error) {
      window.alert("ERROR");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="hero min-h-screen bg-transparent shadow-md">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-transparent">Login</h1>
            <p className="py-6 text-black"></p>
          </div>
          {/**
        
          <div className="card shrink-0 w-full max-w-sm shadow-md bg-gradient-to-r from-amber-100 via-black to-black/50 to-black/50">
          */}
          <div className="card shrink-0 w-full max-w-sm shadow-md bg-black">
          <div className="text-center lg:text-center">
          <h1 className="text-5xl font-bold text-lime-400 pt-10 pb-2">[x_x]</h1>
      
        </div>
          <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-400">Email</span>
                </label>
           
                <label className="input input-bordered flex items-center gap-2 glass">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#A3E636" className="w-6 h-6 opacity-100"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                  <input type="text" value={localEmail} onChange={(e) => setLocalEmail(e.target.value)} className="grow bg-amber-100 text-lime-400" placeholder="Email" />
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-400">Password</span>
                </label>
           
                <label className="input input-bordered flex items-center gap-2 glass">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#A3E636" className="w-6 h-6 opacity-100"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                  <input value={localPassword} onChange={(e) => setLocalPassword(e.target.value)} type="password" className="grow bg-amber-100 text-lime-400" placeholder="Password"  />
                </label>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover text-white text-xl">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button onClick={handleLoginRequestAndResponse} className="btn bg-gradient-to-r from-black to-black-100 hover:from-black hover:to-lime-400 text-lime-400 hover:text-black text-2xl">Login</button>
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

export default connect(null, { loginUser })(Login);
