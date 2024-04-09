/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../../components/redux/actions/userAction';
import { Link } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({registerUser}) => {
    const [localFirstName, setLocalFirstName] = useState("");
    const [localLastName, setLocalLastName] = useState("");
    const [localEmail, setLocalEmail] = useState("");
    const [localContactNo, setLocalContactNo] = useState("");
    const [localPassword, setLocalPassword] = useState("");
    const [localConfirmPassword, setLocalConfirmPassword] = useState("");

    const handleRegisterUserRequestAndResponse = async (event) => {
        event.preventDefault();
        try {
            await registerUser({
                user_firstname: localFirstName,
                user_lastname: localLastName,
                user_email: localEmail,
                user_contact_no: localContactNo,
                user_password: localPassword,
                password_confirmation: localConfirmPassword
            });

        } catch (error) {
            console.error('Registration error:', error);
        }
    };
    

    return (
        <div>
        <ToastContainer />
            <div className="hero min-h-screen bg-transparent">
                <div className="hero-content flex-col lg:flex-row-start">
                    <div className="text-center lg:text-left">
                        {/* Your existing content */}
                    </div>
                    <div className="card-0 w-full max-w-md shadow-2xl bg-amber-100 md:flex">
                        <form className="card-body">
                            <span className="text-center text-3xl py-3 px-3">REGISTER</span>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Firstname</span>
                                </label>
                                <input type="text" value={localFirstName} onChange={(e) => setLocalFirstName(e.target.value)} placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Lastname</span>
                            </label>
                            <input type="text" value={localLastName} onChange={(e) => setLocalLastName(e.target.value)} placeholder="name" className="input input-bordered" required />
                        </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" value={localEmail} onChange={(e) => setLocalEmail(e.target.value)} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contact No.</span>
                            </label>
                            <input type="text" value={localContactNo} onChange={(e) => setLocalContactNo(e.target.value)} placeholder="email" className="input input-bordered" required />
                        </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" value={localPassword} onChange={(e) => setLocalPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="text" value={localConfirmPassword} onChange={(e) => setLocalConfirmPassword(e.target.value)} placeholder="confirm password" className="input input-bordered" required />
                                <label className="label">
                                    <Link to="/resetpassword" className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handleRegisterUserRequestAndResponse} className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { registerUser })(Register);
