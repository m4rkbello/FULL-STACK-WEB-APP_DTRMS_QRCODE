import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/userAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ loginUser }) => {
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
        navigate("/"); // Redirect to root path upon successful login
      }, 1000); // Adjust the timeout duration as needed
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to log in. Please try again."); // Use toast for error notification
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
                  <input type="text" value={localEmail} onChange={(e) => setLocalEmail(e.target.value)} className="grow bg-amber-100 text-lime-400" placeholder="Email" />
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-400">Password</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 glass">
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
