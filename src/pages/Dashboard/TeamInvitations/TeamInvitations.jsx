import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { myTeamsByInvitations, acceptTeam } from "../../../utilities/manageTeam";
import { Helmet } from "react-helmet";

const TeamInvitations = () => {
    const {user} = useContext(AuthContext);
    const [myInvitedTeams, setMyInvitedTeams] = useState([])
    
    useEffect(() => {
        const invitedTeams =  myTeamsByInvitations(user?.email);
        setMyInvitedTeams(invitedTeams)
    }, [user?.email])
    
   const handleAcceptTeam = tname => {
    acceptTeam(tname, user?.email)
    const invitedTeams =  myTeamsByInvitations(user?.email);
    setMyInvitedTeams(invitedTeams)

   }
    // console.log(myInvitedTeams)
    return (
        <>
            <Helmet>
                <title>TaskHub || Teams & Invitations</title>
            </Helmet>
            <div className="w-full p-4">
            <h2 className="text-3xl text-center my-5 font-semibold">Teams & Invitations for: {user?.displayName}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Team Name</th>
                        <th>Team Creator</th>
                        <th>Members</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        myInvitedTeams.map((team, index) => 
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="uppercase">{team.tname}</td>
                            <td>{team.towner}</td>
                            <td>
                                <ul>
                                {
                                team.teamMembers.map((member, index) => <li key={index}>{member.user} - 
                                {member.accepted === 0 ? "Pending" : "Accepted"}</li>)
                                }
                                </ul>
                            </td>
                            <td>
                            {
                                team.teamMembers.map((member, index) => 
                                    member.accepted == 0 && member.user === user?.email && 
                                    <div key={index}>
                                    <button onClick={() => handleAcceptTeam(team.tname)} className="btn bg-green-700 text-white">
                                    Accept</button>
                                    </div> 
                                   
                                )
                            }
                            {
                                team.teamMembers.map((member, index) => 
                                    member.accepted == 1 && member.user === user?.email && 
                                    
                                        <span key={index}>Accepted</span>
                                    
                                   
                                )
                            }
                                
                                
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

export default TeamInvitations;