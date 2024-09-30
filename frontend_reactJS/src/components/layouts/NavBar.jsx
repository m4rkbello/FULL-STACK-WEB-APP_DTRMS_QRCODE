/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const NavBar = ({ isAuthenticated, isAuthenticatedUser }) => {
    return (
        <div>
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