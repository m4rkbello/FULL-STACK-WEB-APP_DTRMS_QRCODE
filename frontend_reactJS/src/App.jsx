import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/admin/Login';
import Register from './components/Auth/admin/Register';
import ForgotPassword from './components/Auth/admin/ForgotPassword';
import PersonalDetails from './components/Auth/employee/EmployeePersonalDetails';
import Content from './components/layouts/Content';
import Footer from './components/layouts/Footer';
import EmployeeRegister from './components/Auth/employee/EmployeeRegister';


function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="navbar bg-amber-100 px-4 py-2 md:px-8 md:py-4">
        <div className="flex-none">
          <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-2xl text-black">DTRMS BY M4RKBELLO</a>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-amber-100 rounded-box w-52">
            <li>
              <a className="justify-between text-black">
                Profile <span className="badge bg-black"><span className='text-white'>Open</span></span>
              </a>
            </li>
            <li className='text-black'>
              <a>Settings</a>
            </li>
            <li className='text-black'>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="drawer lg:drawer-open flex-1">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center px-4 py-8 md:px-8 md:py-12">
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/content" element={<Content />} />
            <Route path="/details" element={<PersonalDetails />} />
            <Route path="/register" element={<EmployeeRegister />} />
          </Routes>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu pt-4 pl-4 pr-4 pb-4 w-80 min-h-full bg-black text-amber-100">
            <li>
              <Link to="/admin/login">
                <a>Login Testing</a>
              </Link>
            </li>
            <li>
              <Link to="/content">
                <a>Content Test</a>
              </Link>
            </li>
            <li>
              <Link to="/details">
                <a>Details Test</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;