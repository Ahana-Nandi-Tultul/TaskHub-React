import { useContext } from 'react';
import logo from '../../../assets/logo.png'
import { AuthContext } from '../../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
const Navbar = () => {
    const {user, logout} = useContext(AuthContext);
    const handleLogout = () => {
        logout()
        .then(() => {})
        .catch(error => console.log(error))
    }
   
    return (
        <>
           <div className="navbar bg-base-200 md:px-20 py-4 flex items-center justify-between" data-aos="fade-up">
                <div className="navbar-start items-center flex">
                    <div className="dropdown">
                    <label tabIndex={0} htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden drawer-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navbarLink}
                    </ul> */}
                    </div>
                    <a className="btn btn-ghost normal-case text-xl px-0">
                        <img src={logo} alt="" className='mx-0' />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {/* <ul className="menu menu-horizontal px-1">
                        {navbarLink}
                    </ul> */}
                </div>
                <div className="navbar-end hidden lg:flex">
                    {
                         user ? <>
                         <div className="avatar mr-4">
                             <div className="w-10 h-10 rounded-full ring ring-black ring-offset-2">
                                 {
                                     user?.photoURL ? 
                                     <img src={user?.photoURL} 
                                     className='me-2 bg-dark text-white' 
                                     data-tooltip-id="my-tooltip" data-tooltip-content={user?.displayName}/>
                                     :<FaUserCircle data-tooltip-content={user?.displayName} className='h-full w-full'/>
                                 }
                                <Tooltip id="my-tooltip" className='bg-black text-white z-20' />
                             </div>
                         </div>
                         <button className='btn bg-white' onClick={handleLogout}>Logout</button>         
                         </> 
                          : 
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