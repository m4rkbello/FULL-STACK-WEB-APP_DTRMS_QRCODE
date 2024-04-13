/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import { FaUpload } from "react-icons/fa6";
// import img from '../../../../src/assets/images/pic-removebg-preview.png'

const EmployeeRegister = () => {
    return (
        <div className="hero max-w-full">

            <div className="hero min-h-screen bg-amber-100 rounded-t-lg">
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog justify-center">
                            <input type="file" className="file-input bg-amber-100 w-full max-w-xs" />
                            <button className="btn btn-primary ml-5">Upload</button>
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                </dialog>
                <div className="hero-content flex flex-col items-center">

                    <img
                        className="mask mask-circle shadow-inner"
                        src="https://images.pexels.com/photos/9123448/pexels-photo-9123448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        type="file"

                        width="17%"
                    />

                    <button className="btn  bg-transparent" onClick={() => document.getElementById('my_modal_3').showModal()}><FaUpload height={30} width={30} /></button>

                    <div className="hero-content flex-col lg:flex-row">
                        <div className="flex">
                            <div className="">
                                {/**
                                <img
                                    src={img}
                                    className="max-w-sm rounded-lg shadow-2xl"
                                />
                                */}

                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black text-2xl">Fullname</span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Etc.. Mark Bello"
                                        className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                        defaultValue=""
                                    />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black text-2xl">Email</span>
                                    </label>

                                    <input

                                        type="text"
                                        placeholder="email"
                                        className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                        defaultValue=""
                                    />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black text-2xl">Email</span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="email"
                                        className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                        defaultValue=""
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black text-2xl">Contact No.</span>
                                    </label>
                                    <input

                                        type="text"
                                        placeholder="contact no"
                                        className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                        defaultValue=""
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black text-2xl">Position</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="contact no"
                                        className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                        defaultValue=""
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black text-2xl">Department</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="contact no"
                                        className="input input-bordered shadow-2xl text-2xl bg-amber-100 text-black"
                                        defaultValue=""
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text text-black text-2xl">Status</span>
                                </label>
                                <select className="select a, select-warning w-full max-w-xs">
                                    <option selected value="1">Select Status</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                            <button className="btn btn-primary p-5 m-2">Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default connect(null, null)(EmployeeRegister);