/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/userAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeLogin = ({ loginUser }) => {
    const [localEmail, setLocalEmail] = useState("");
    const [localPassword, setLocalPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLoginRequestAndResponse = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const userData = {
                user_email: localEmail,
                user_password: localPassword,
            };

            await loginUser(userData);
            setIsLoading(false);

            setTimeout(() => {
                navigate("/dashboard"); // Redirect to root path upon successful login
                window.location.reload();
            }, 5000); // Adjust the timeout duration as needed
        } catch (error) {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
        <ToastContainer />
        <div className="artboard phone-2 flex flex-col items-center justify-center w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 relative">
     
        <div className="absolute top-[-0px] left-1/2 transform -translate-x-1/2 z-50">
          <img
          src="https://i.ibb.co/7JHVynR/DTRMS-LOGO-removebg-preview.png"
          alt="m4rk"
          className="min-h-40 min-w-40 sm:w-20 sm:h-20 object-contain"
        />
          </div>
      
          <div className="card shrink-0 w-full shadow-md bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-700 border-t-8 border-b-8 border-black">
          <form className="card-body">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-black pt-8 sm:pt-10 pb-2">
              DTRMS+
            </h1>
          </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg sm:text-xl text-black">Email</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 glass">
                  <input
                    type="text"
                    value={localEmail}
                    onChange={(e) => setLocalEmail(e.target.value)}
                    className="grow bg-black text-black placeholder-black"
                    placeholder="Email"
                  />
                </label>
              </div>
      
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg sm:text-xl text-black">Password</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 glass">
                  <input
                    value={localPassword}
                    onChange={(e) => setLocalPassword(e.target.value)}
                    type="password"
                    className="grow text-black placeholder-black"
                    placeholder="Password"
                  />
                </label>
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-black text-sm sm:text-lg"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
      
              <div className="form-control mt-6">
                <button
                  onClick={handleLoginRequestAndResponse}
                  className="btn drop-shadow-2xl bg-gradient-to-r from-zinc-100 to-black-100 hover:from-black hover:to-zinc-400 text-black text-xl sm:text-2xl"
                >
                  Login
                </button>
              </div>
      
              <center>
                <span
                  id="loading-infinity"
                  className={`loading loading-infinity loading-lg ${isLoading ? 'block' : 'hidden'
                    } spinner-blue`}
                ></span>
              </center>
            </form>
          </div>
        </div>
      </div>
      

    )
};


export default connect(null, { loginUser })(EmployeeLogin);
