import { useContext, useState } from "react";
import { getUsers } from "../../../utilities/manageUsers";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { getOneTeam, updateTeam } from "../../../utilities/manageTeam";
import { Helmet } from "react-helmet-async";

const UpdateTeam = () => {
    const {user} = useContext(AuthContext);
    const allSavedUsers = getUsers();
    const tname = useParams();
    const team = getOneTeam(tname.tname);

    let savedUsers = []
    if(allSavedUsers) {
         savedUsers = allSavedUsers.filter(savedUser => savedUser !== user?.email);

    }
    const teamMembers =  team?.teamMembers.map((member) => member.user) || []
    const [selectedUsers, setSelectedUsers] = useState(teamMembers);
    const navigate = useNavigate()
    const handleCheckboxChange = (event) => {
        const userValue = event.target.value;
        const isChecked = event.target.checked;
        // console.log(selectedUsers, isChecked)
            if (isChecked) {
          setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userValue]);
        } else {
          setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.filter((user) => user !== userValue)
          );
        }
      };
    const handleUpdateTeam = event => {
        event.preventDefault()
        const form = event.target;
        const tname =  form.tname.value.toLowerCase();
        const towner  = form.towner.value;
        // console.log(towner);
        const teamMembers = selectedUsers.map((user) => ({
            accepted: 0,
            user: user,
          }))
        const newTeam = {tname, towner, teamMembers};
        updateTeam(team.tname, newTeam);
        form.reset();
        navigate('/home/myTeams')
    }
    return (
        <>
            <Helmet>
                <title>TaskHub || Update Teams</title>
            </Helmet>
            <div className="w-full p-4">
            <h2 className="text-3xl text-center font-semibold my-4">Update Team: {team.towner}</h2>
            <form onSubmit={handleUpdateTeam}>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 mb-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Team Name</span>
                        </label>
                        <label className="input-group">
                            <span>TName</span>
                            <input type="text" defaultValue={team.tname} name="tname" className="input input-bordered w-full" required/>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Team Owner</span>
                        </label>
                        <label className="input-group">
                            <span>TOwner</span>
                            <input type="text" defaultValue={user?.displayName} name="towner" className="input input-bordered w-full"  required/>
                        </label>
                    </div>
                </div>
                
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Choose Team Members</span>
                    </label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {
                           savedUsers.map((user, idx) =>  <div className="flex items-center gap-2" 
                                key={idx}
                                >
                                <input type="checkbox" 
                                onChange={handleCheckboxChange}
                                defaultChecked = { selectedUsers.includes(user) ||
                                team.teamMembers.some(member =>  member.user === user)
                                }
                                 name="tmembers" value={user} className="checkbox checkbox-sm"
                                 />
                                <span>{user}</span>
                            </div>)
                            }
                    </div>
                </div>
                <div className="form-control my-4 w-full">
                <input type="submit" value="Update Team" className="btn  btn-primary w-full"/>
                </div>
            </form>
        </div>
        </>
       
    );
};

export default UpdateTeam;