import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { getUsers } from "../../../utilities/manageUsers";
import { createTeam } from "../../../utilities/manageTeam";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CreateTeam = () => {
    const {user} = useContext(AuthContext);
    const allSavedUsers = getUsers();
    let savedUsers = []
    if(allSavedUsers) {
         savedUsers = allSavedUsers.filter(savedUser => savedUser !== user?.email);

    }
    const [selectedUsers, setSelectedUsers] = useState([user?.email]||[]);
    const navigate = useNavigate()
    const handleCheckboxChange = (event) => {
        const userValue = event.target.value;
        const isChecked = event.target.checked;
            if (isChecked) {
          setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userValue]);
        } else {
          setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.filter((user) => user !== userValue)
          );
        }
      };
    const handleCreateTeam = event => {
        event.preventDefault()
        const form = event.target;
        const tname =  form.tname.value.toLowerCase();
        const towner  = form.towner.value;
        const townerEmail = user?.email;
        let teamMembers = selectedUsers.map((user) => ({
            accepted: 0,
            user: user,
          }))
        const team = {tname, towner, townerEmail, teamMembers};
        createTeam(team);
        form.reset();
        navigate('/home/myTeams')
    }
    return (
        <>
            <Helmet>
                <title>TaskHub || Create Team</title>
            </Helmet>
            <div className="w-full p-4" data-aos="fade-down">
            <h2 className="text-3xl text-center font-semibold my-4">Create a Team and Send Invitation</h2>
            <div className="divider"></div>
            <form onSubmit={handleCreateTeam}>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 mb-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Team Name</span>
                        </label>
                        <label className="input-group">
                            <span>TName</span>
                            <input type="text" placeholder="team name" name="tname" className="input input-bordered w-full" required/>
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
                            savedUsers.length >= 1  ? <>
                            {
                                savedUsers.map((user, idx) =>  <div className="flex items-center gap-2" 
                                key={idx}
                                >
                                <input type="checkbox" 
                                onChange={handleCheckboxChange}
                                checked={selectedUsers.includes(user)}
                                 name="tmembers" value={user} className="checkbox checkbox-sm"  />
                                <span>{user}</span>
                            </div>)
                            }
                            </> :
                            <span>No user to create team</span>
                        }
                    </div>
                </div>
                <div className="form-control my-4 w-full">
                <input type="submit" value="Create Team" className="btn  btn-primary w-full"/>
                </div>
            </form>
        </div>
        </>
    );
};

export default CreateTeam;