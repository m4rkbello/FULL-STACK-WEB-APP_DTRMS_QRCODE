/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FcOpenedFolder } from "react-icons/fc";

const NavBar = ({ isAuthenticated, isAuthenticatedUser }) => {
    // if (!isAuthenticatedUser) {
    //     return (
    //         <div className="navbar bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 px-4 py-2 md:px-8 md:py-4 border-r-4 border-black">
    //             <div className="flex-1">
    //                 <span className="btn btn-ghost text-4xl text-zinc-400 border-b-4 border-black">DTRMS+</span>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div>
            <div className="flex-none">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost bg-transparent">
                    <div className="drawer-content">

                        <label htmlFor="my-drawer" className="btn drawer-button bg-transparent border-none">
                            <FcOpenedFolder
                                style={{
                                    height: "3rem",
                                    width: "3rem",
                                }}
                            />
                        </label>

                    </div>
                </label>
            </div>
            <div className="flex-1 text-center md:text-left">
                <span className="btn-ghost text-xl md:text-2xl ml-5 mr-2 text-black">Welcome!
                    {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                        <span className='text-2xl' key={index}>
                            {user.user_email}
                        </span>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default NavBar;