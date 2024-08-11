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
        window.location.reload();
      }, 300); // Adjust the timeout duration as needed
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to log in. Please try again."); // Use toast for error notification
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
    <ToastContainer />
    <div className="artboard phone-2 flex flex-col items-center justify-center w-full px-4">
        <div className="card shrink-0 w-full max-w-sm shadow-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% border-t-4 border-b-4 border-black">
            <div className="text-center lg:text-center">
                <h1 className="text-5xl font-bold text-black pt-10 pb-2">DTRMS+</h1>
            </div>
            <form className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xl text-white">Email</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 glass">
                        <input type="text" 
                        value={localEmail} 
                        onChange={(e) => setLocalEmail(e.target.value)}
                         className="grow bg-black text-black placeholder-black"
                          placeholder="Email" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xl text-white">Password</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 glass">
                        <input value={localPassword} onChange={(e) => setLocalPassword(e.target.value)} type="password" 
                        className="grow text-black placeholder-black"
                         placeholder="Password"
                         style={{ color:'black' }}
                         />
                    </label>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover text-white text-lg">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button onClick={handleLoginRequestAndResponse} className="btn drop-shadow-2xl bg-gradient-to-r from-zinc-100 to-black-100 hover:from-black hover:to-zinc-400 text-black hover:text-black text-2xl">Login</button>
                </div>
                <center>
                    <span id="loading-infinity" className={`loading loading-infinity loading-lg ${isLoading ? 'block' : 'hidden'} spinner-blue`}></span>
                </center>
            </form>
        </div>
    </div>
</div>

    
  )
}


export default connect(null, { loginUser })(Login);
