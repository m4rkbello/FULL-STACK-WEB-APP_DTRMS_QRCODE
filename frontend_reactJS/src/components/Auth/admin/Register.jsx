/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../../components/redux/actions/userAction';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({registerUser}) => {
    const [localFirstName, setLocalFirstName] = useState("");
    const [localLastName, setLocalLastName] = useState("");
    const [localEmail, setLocalEmail] = useState("");
    const [localContactNo, setLocalContactNo] = useState("");
    const [localPassword, setLocalPassword] = useState("");
    const [localConfirmPassword, setLocalConfirmPassword] = useState("");
    //FOR LOADING REQUEST!
    const [isLoading, setIsLoading] = useState(false);

  //redirect if successful login
  const navigate = useNavigate();

    const handleRegisterUserRequestAndResponse = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if(localPassword !== localConfirmPassword){
            console.error("PASSWORD DOESN'T MATCH!");
            setIsLoading(false);
            return;
        }

        try {
            await registerUser({
                user_firstname: localFirstName,
                user_lastname: localLastName,
                user_email: localEmail,
                user_contact_no: localContactNo,
                user_password: localPassword,
                password_confirmation: localConfirmPassword
            });

            setTimeout(() => {
                window.location.reload();
                navigate("/http://localhost:5173/admin/login");
            }, 5000)

        } catch (error) {
            console.error('Registration error:', error);
        }finally {
            setIsLoading(false);
          }
    };
    
    return (
        <div>
        <ToastContainer />

           <div className="hero min-h-screen bg-transparent shadow-md">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-center">
            <h1 className="text-5xl font-bold text-black">REGISTER</h1>
            <p className="py-6 text-black">.</p>
          </div>
          {/***
        
          <div className="card shrink-0 w-full max-w-sm shadow-md bg-gradient-to-r from-amber-100 via-black to-black/50 to-black/50">
            */}
          <div className="card shrink-0 w-full max-w-sm shadow-md bg-black">

                    <form className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl text-white">Firstname</span>
                            </label>
                            <input type="text" value={localFirstName} onChange={(e) => setLocalFirstName(e.target.value)} placeholder="name" className="input input-bordered grow glass text-lime-400" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl text-white">Lastname</span>
                        </label>
                        <input type="text" value={localLastName} onChange={(e) => setLocalLastName(e.target.value)} placeholder="name" className="input input-bordered grow glass text-lime-400" required />
                    </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl text-white">Email</span>
                            </label>
                            <input type="email" value={localEmail} onChange={(e) => setLocalEmail(e.target.value)} placeholder="email" className="input input-bordered grow glass text-lime-400" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl text-white">Contact No.</span>
                        </label>
                        <input type="text" value={localContactNo} onChange={(e) => setLocalContactNo(e.target.value)} placeholder="contact no." className="input input-bordered grow glass text-lime-400" required />
                    </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl text-white">Password</span>
                            </label>
                          
                            <input type="password" value={localPassword} onChange={(e) => setLocalPassword(e.target.value)} placeholder="password" className="input input-bordered grow glass text-lime-400" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl text-white">Confirm Password</span>
                            </label>
                            <input type="password" value={localConfirmPassword} onChange={(e) => setLocalConfirmPassword(e.target.value)} placeholder="confirm password" className="input input-bordered grow glass text-lime-400" required />
                            <label className="label">
                                <Link to="/resetpassword" className="label-text text-xl text-white-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                        <button onClick={handleRegisterUserRequestAndResponse} className="btn bg-gradient-to-r from-black to-black-100 hover:from-black hover:to-lime-400 text-lime-400 hover:text-black text-2xl">Register</button>
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

export default connect(null, { registerUser })(Register);
