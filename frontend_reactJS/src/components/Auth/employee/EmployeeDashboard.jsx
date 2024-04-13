



import { Link  } from 'react-router-dom';


const EmployeeDashboard = () => {
    return (
        <div className="hero max-w-full">
            <div className="hero min-h-screen bg-amber-100 rounded-lg">
                <div className="pt-0 pl-0 pr-0 pb-0 my-0 mx-0 px-0 py-0">
                    <span className="text-3xl text-black">
                    <center>
                    EMPLOPYEE DASHBOARD
                    </center>
                    </span>
                   
                    <div className="overflow-x-auto bg-transparent text-black">
                        <table className="table py-10 px-10 my-10 mx-10">
                            {/* head */}
                            <thead className="text-black text-1xl">
                                <tr>
                                    <th>Avatar</th>
                                    <th>Fullname</th>
                                    <th>Email</th>
                                    <th>Contact No.</th>
                                    <th>Position</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                       2
                                    </td>
                                    <td>3</td>
                                    <td>
                                    4
                                    </td>
                                    <td>5
                                    </td>
                                    <td>
                                    6
                                    </td>
                                    <td>
                                    7
                                    </td>
                                    <td>
                                    <button className="btn btn-primary p-5 m-2">
                                    <Link to="/register">View</Link>
                                  </button>
                          
                                    <button className="btn btn-primary p-5 m-2">Remove</button>
                                   
                                    </td>
                                </tr>
                            </tbody>


                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default EmployeeDashboard;


