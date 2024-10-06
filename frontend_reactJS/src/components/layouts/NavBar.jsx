/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link for navigation
import { FaUserTie, FaRunning } from "react-icons/fa"; // Make sure to import necessary icons
import { AiFillSetting } from "react-icons/ai"; // Importing settings icon

const NavBar = ({ isAuthenticatedUser, destroyAuthentications }) => {
    return (
        <div className="navbar bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% mx-0 my-0 py-0 px-0 bg-base-100">
            <div className="flex-1 flex items-center">

                {isAuthenticatedUser && isAuthenticatedUser.length > 0 && (
                    <span className="text-xl ml-4 hidden md:block">
                        Welcome, {isAuthenticatedUser[0].user_email}
                    </span>
                )}
            </div>
            <div className="flex-none">
                {/* User Avatar with Dropdown */}
                {isAuthenticatedUser && isAuthenticatedUser.length > 0 && (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Profile"
                                    src={isAuthenticatedUser[0].user_image}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-box w-52"
                        >
                            {/* Profile */}
                            <li>
                                <span className="justify-between text-black">
                                    <FaUserTie style={{ fontSize: "25px", color: "white" }} />
                                    <span style={{ fontSize: "20px", color: "white" }}>
                                        Profile
                                    </span>
                                    <span className="badge bg-black text-white">
                                        <Link to="/admin/user/profile-details">Open</Link>
                                    </span>
                                </span>
                            </li>
                            {/* Settings */}
                            <li className="text-black">
                                <span className="justify-between">
                                    <AiFillSetting style={{ fontSize: "25px", color: "white" }} />
                                    <span style={{ fontSize: "20px", color: "white" }}>
                                        Settings
                                    </span>
                                    <span className="badge bg-black text-white">
                                        <Link to="">Open</Link>
                                    </span>
                                </span>
                            </li>
                            {/* Logout */}
                            <li className="text-black" onClick={destroyAuthentications}>
                                <span className="flex justify-between items-center">
                                    <FaRunning style={{ fontSize: "25px", color: "white" }} />
                                    <span style={{ fontSize: "20px", color: "white" }}>Logout</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
