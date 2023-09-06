import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { getUsers } from "../../../utilities/manageUsers";

const CreateTeam = () => {
    const {user} = useContext(AuthContext);
    const savedUsers = getUsers();
    const handleCreateTeam = event => {
        event.preventDefault()
    }
    return (
        <div className="w-full p-4">
            <h2 className="text-3xl text-center font-semibold my-4">Create a Team and Send Invitation</h2>
            <form onSubmit={handleCreateTeam}>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 mb-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Team Name</span>
                        </label>
                        <label className="input-group">
                            <span>TName</span>
                            <input type="text" placeholder="team name" name="tname" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Team Owner</span>
                        </label>
                        <label className="input-group">
                            <span>TOwner</span>
                            <input type="text" defaultValue={user?.displayName} name="towner" className="input input-bordered w-full"  />
                        </label>
                    </div>
                </div>
                
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Choose Team Members</span>
                    </label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {
                            savedUsers ? <>
                            {
                                savedUsers.map((user, idx) =>  <div className="flex items-center gap-2" 
                                key={idx}
                                >
                                <input type="checkbox"  name="tmembers" value={user} className="checkbox checkbox-sm"  />
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
    );
};

export default CreateTeam;