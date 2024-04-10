

const EmployeeRegister = () => {
  return (
    <div>
    <div>
    <div className="hero min-h-screen bg-transparent shadow-md">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold text-amber-100">Employee | Register here!</h1>
                <p className="py-6 text-black">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-md bg-gradient-to-r from-amber-100 via-amber-100 to-amber-100/10 to-black/90">
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl text-black">Firstname</span>
                        </label>
                        <input type="text" placeholder="firstname" className="shadow-2xl input input-bordered bg-amber-100 text-blak" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                    <span className="label-text text-xl text-black">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered bg-amber-100" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl text-black">Contact No.</span>
                        </label>
                        <input type="text" placeholder="Enter Contact No." className="input input-bordered bg-amber-100" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl text-black">Position</span>
                        </label>
                        <input type="text" placeholder="contact number" className="input input-bordered bg-amber-100" required />
                    </div>
                    <div className="form-control">
    
                    <label className="label">
                    <span className="label-text text-xl text-black">Selet</span>
                  </label>
                  <select defaultValue="1">
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                </select>
                    </div>
                    <div className="form-control">
                    <select defaultValue="">
                    <option value="0">Inactive</option>
                    <option value="2">Active</option>
                  </select>
                      </div>
                  

                    <div className="form-control mt-6">
                        <button className="btn bg-gradient-to-r from-black to-black-100 hover:from-lime-500 hover:to-amber-100 text-amber-100 hover:text-black  text-2xl">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default EmployeeRegister;