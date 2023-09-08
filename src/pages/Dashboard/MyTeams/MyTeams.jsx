import { useContext, useState } from "react";
import { deleteTeam, getMyTeams } from "../../../utilities/manageTeam";
import { AuthContext } from "../../../providers/AuthProvider";
import { BiSolidCommentEdit } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyTeams = () => {
    const {user} = useContext(AuthContext);
    const savedTeam = getMyTeams(user?.displayName);
    const [myTeams, setMyTeams] = useState(savedTeam);
    // console.log("myteams" ,myTeams)
    const navigate = useNavigate()
     const handleNavigateUpdateTeam = (tname) => {
        navigate(`/home/updateTeam/${tname}`);
     }

    const handleDeleteTeam = tname => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteTeam(tname);
                setMyTeams(getMyTeams(user?.displayName))
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }

    return (
        <>
            <Helmet>
                <title>TaskHub || My Teams</title>
            </Helmet>
            <div className="w-full p-4" data-aos="fade-down">
            <h2 className="text-3xl text-center my-5 font-semibold">Teams Created by: {user?.displayName}</h2>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Team Name</th>
                        <th>Members</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        myTeams.map((team, index) => 
                        <tr key={index}>
                            <td>
                            <button className="btn btn-circle btn-outline" onClick={() => handleDeleteTeam(team.tname)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            </td>
                            <td>{index + 1}</td>
                            <td>{team.tname}</td>
                            <td>
                                <ul>
                                {
                                team.teamMembers.map((member, index) => <li key={index}>{member.user} - 
                                {member.accepted === 0 ? "Pending" : "Accepted"}</li>)
                                }
                                </ul>
                            </td>
                            <td>
                                
                                <button onClick={() => handleNavigateUpdateTeam(team.tname)} className="btn bg-green-700 text-white">
                                    <BiSolidCommentEdit className="w-6 h-6"/></button>
                                
                            </td>
                        </tr>
                        )
                    }
                   
                    </tbody>
                </table>
            </div>
        </div>
        </>
        
    );
};

export default MyTeams;