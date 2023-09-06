import { useContext } from 'react';
import logo from '../../../assets/logo.png'
import { AuthContext } from '../../../providers/AuthProvider';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const {user, logout} = useContext(AuthContext);
    const handleLogout = () => {
        logout()
        .then(() => {})
        .catch(error => console.log(error))
    }
    // const navbarLink = <>
        
    // </>
    return (
        <>
           <div className="navbar bg-base-200 md:px-20 py-4 flex">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden drawer-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navbarLink}
                    </ul> */}
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">
                        <img src={logo} alt=""  />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {/* <ul className="menu menu-horizontal px-1">
                        {navbarLink}
                    </ul> */}
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                        <button className="btn bg-white" onClick={handleLogout}>Logout</button>
                        </> : 
                        <>
                        <Link to="/" className="btn bg-white">Login</Link>
                        </>
                    }
                </div>
            </div> 
        </>
    );
};

export default Navbar;