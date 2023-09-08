import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import { FaHome, FaTasks, FaUserCircle } from 'react-icons/fa';
import { BiTask, BiGroup } from 'react-icons/bi';
import {MdOutlineGroupAdd } from 'react-icons/md';
import { Toaster } from 'react-hot-toast';
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
    const {user, logout} = useContext(AuthContext);
    const handleLogout = () => {
        logout()
        .then(() => {})
        .catch(error => console.log(error))
    }
    return (
        <>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                    {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
                
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-50 md:w-70 min-h-full bg-base-200 text-base-content space-y-4">
                    {/* Sidebar content here */}
                    <NavLink className="flex items-center gap-4 text-lg" to="/home/dashboard"><FaHome/> Dashboard</NavLink>
                    <NavLink className="flex items-center gap-4 text-lg" to="/home/profile"><FaUserCircle/> Profile</NavLink>
                    <div className="divider"></div>
                    <NavLink className="flex items-center gap-4 text-lg" to="/home/createTeam"><MdOutlineGroupAdd/> Create Team</NavLink>
                    <NavLink className="flex items-center gap-4 text-lg" to="/home/myTeams"><BiGroup/> My Teams</NavLink>
                    <NavLink className="flex items-center gap-4 text-lg" to="/home/teamInvitations"><BiGroup/> Teams & Invitations</NavLink>
                    <div className="divider"></div>
                    <NavLink className="flex items-center gap-4 text-lg" to="/home/myCreatedTask"><FaTasks/> My Created Task </NavLink>
                    <NavLink className="flex items-center gap-4 text-lg" to="/home/createTask"><BiTask/> Create A Task </NavLink>
                    <NavLink className="flex items-center gap-4 text-lg" to="/home/myTasks"><FaTasks/> My Task </NavLink>
                    {
                        
                        user && <button className="btn bg-white md:hidden flex" onClick={handleLogout}>Logout</button>
                    }
                    </ul>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default Home;