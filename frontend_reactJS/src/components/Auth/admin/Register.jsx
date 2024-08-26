/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../../components/redux/actions/userAction';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ registerUser }) => {
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

        if (localPassword !== localConfirmPassword) {
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer />

            <div className="min-h-screen flex items-center justify-center">
            <div className="artboard phone-2 flex flex-col items-center justify-center w-full mx-4">
                    {/***
        
          <div className="card shrink-0 w-full max-w-sm shadow-md bg-gradient-to-r from-amber-100 via-black to-black/50 to-black/50">
            */}
                    <div className="card shrink-0 w-full max-w-sm shadow-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  border-t-4 border-b-4 border-black">

                        <form className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-black">Firstname</span>
                                </label>
                                <input type="text" value={localFirstName} onChange={(e) => setLocalFirstName(e.target.value)} placeholder="Enter Firstname" className="input input-bordered grow glass text-black placeholder-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-black">Lastname</span>
                                </label>
                                <input type="text" value={localLastName} onChange={(e) => setLocalLastName(e.target.value)} placeholder="Enter Lastname" className="input input-bordered grow glass text-black placeholder-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-black">Email</span>
                                </label>
                                <input type="email" value={localEmail} onChange={(e) => setLocalEmail(e.target.value)} placeholder="Enter Email" className="input input-bordered grow glass text-black placeholder-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-black">Contact No.</span>
                                </label>
                                <input type="text" value={localContactNo} onChange={(e) => setLocalContactNo(e.target.value)} placeholder="Enter Contact No." className="input input-bordered grow glass text-black placeholder-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-black">Password</span>
                                </label>

                                <input type="password" value={localPassword} onChange={(e) => setLocalPassword(e.target.value)} placeholder="Enter Password" className="input input-bordered grow glass text-black placeholder-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-black">Confirm Password</span>
                                </label>
                                <input type="password" value={localConfirmPassword} onChange={(e) => setLocalConfirmPassword(e.target.value)} placeholder="Enter Confirm Password" className="input input-bordered grow glass text-black placeholder-black" required />
                                <label className="label">
                                    <Link to="/resetpassword" className="label-text text-xl text-black-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handleRegisterUserRequestAndResponse} className="btn drop-shadow-2xl bg-gradient-to-r from-zinc-100 to-black-100 hover:from-black hover:to-zinc-400 text-black hover:text-black text-2xl">Register</button>
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
