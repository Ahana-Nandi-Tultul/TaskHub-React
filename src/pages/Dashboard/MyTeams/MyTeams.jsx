import { useContext } from "react";
import { getMyTeams } from "../../../utilities/manageTeam";
import { AuthContext } from "../../../providers/AuthProvider";
import { BiSolidCommentEdit } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";

const MyTeams = () => {
    const {user} = useContext(AuthContext);
    const myTeams = getMyTeams(user?.displayName);
    // console.log("myteams" ,myTeams)
    const navigate = useNavigate()
     const handleNavigateUpdateTeam = (tname) => {
        navigate(`/home/updateTeam/${tname}`);
     }

    return (
        <div className="w-full p-4">
            <h2 className="text-3xl text-center my-5 font-semibold">Teams Created by: {user?.displayName}</h2>
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
                            <button className="btn btn-circle btn-outline">
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
    );
};

export default MyTeams;