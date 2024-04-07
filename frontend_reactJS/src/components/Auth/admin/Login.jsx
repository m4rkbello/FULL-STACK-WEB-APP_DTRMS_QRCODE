import React from 'react'

const Login = () => {
  return (
    <div>
    <div className="hero min-h-screen bg-transparent shadow-md">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-black">Login now!</h1>
      <p className="py-6 text-black">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-md bg-gradient-to-r from-amber-100 via-black to-black/50 to-black/50">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl text-black">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered bg-amber-100" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl text-black">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered bg-amber-100" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover text-amber-100 text-xl">Forgot password?</a>
          </label>
        </div>


        <div className="form-control mt-6">
        <button className="btn bg-gradient-to-r from-black to-black-100 hover:from-black hover:to-amber-100 text-amber-100 hover:text-black  text-2xl">Login</button>
      </div>

      </form>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login