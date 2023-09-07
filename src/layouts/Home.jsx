import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import { FaHome } from 'react-icons/fa';
import { BiTask, BiGroup } from 'react-icons/bi';
import {MdOutlineGroupAdd } from 'react-icons/md';
const Home = () => {
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
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-4">
                {/* Sidebar content here */}
                <NavLink className="flex items-center gap-4 text-lg" to="/home/dashboard"><FaHome/> Dashboard</NavLink>
                <div className="divider"></div>
                <NavLink className="flex items-center gap-4 text-lg" to="/home/createTeam"><MdOutlineGroupAdd/> Create Team</NavLink>
                <NavLink className="flex items-center gap-4 text-lg" to="/home/myTeams"><BiGroup/> MyTeams</NavLink>
                <div className="divider"></div>
                <NavLink className="flex items-center gap-4 text-lg" to="/home/dashboard"><BiTask/> Create Task </NavLink>
                <NavLink className="flex items-center gap-4 text-lg" to="/home/dashboard"><FaHome/> Dashboard</NavLink>
                </ul>
            
            </div>
            </div>
        </>
    );
};

export default Home;