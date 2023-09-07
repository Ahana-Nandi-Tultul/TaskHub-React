import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import moment from "moment/moment";
import { createTask } from "../../../utilities/manageTasks";
import { getMyTeamsAsMembers, getTeamMembers } from "../../../utilities/manageTeam";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const CreateTask = () => {
    const priorityLevels = ['high', 'medium', 'low', 'critical', 'normal']
    const {user} = useContext(AuthContext);
    const myTeams = getMyTeamsAsMembers(user?.email);
    const navigate = useNavigate();
    // console.log(myTeams);
    const [teamMembers, setTeamMembers] = useState([]);
    const handleTeamMembers = event => {

        event.preventDefault()
        const savedTeamMembers = getTeamMembers(event.target.value)
        setTeamMembers(savedTeamMembers);
        // console.log(teamMembers)
    }
    const handleCreateTask = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const createdBy = form.createdBy.value;
        const date = form.date.value;
        const priority = form.priority.value;
        const team = form.chooseTeam.value;
        const assignTo = form.assignTo.value;
        const des = form.des.value;
        const status = "pending";

        // console.log(title, createdBy, date, priority, assignTo, des);
        const task = {
            title, createdBy, date, priority, team, assignTo, des, status
        }
        // console.log(task)
        createTask(task);
        form.reset();
        navigate('/home/myCreatedTask');
    }
    return (
        <>
            <Helmet>
                <title>TaskHub || Create A Task</title>
            </Helmet>
            <div className="w-full p-4">
        <h2 className="text-3xl text-center font-semibold my-4">Create A Task</h2>
        <form onSubmit={handleCreateTask}>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 mb-5">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <label className="input-group">
                        <span>Title</span>
                        <input type="text" placeholder="Task Title" name="title" 
                        className="input input-bordered w-full" required/>
                    </label>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Created By</span>
                    </label>
                    <label className="input-group">
                        <span>Created By</span>
                        <input type="text" defaultValue={user?.displayName} 
                        name="createdBy" className="input input-bordered w-full"  required/>
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 mb-5">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Due Date</span>
                    </label>
                    <label className="input-group">
                        <span>Date</span>
                        <input type="date" placeholder="team name" name="date"
                         className="input input-bordered w-full"
                         min={moment().format("YYYY-MM-DD")}
                          required/>
                    </label>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Priority Level</span>
                    </label>
                    <label className="input-group">
                        <span>Priority</span>
                        <select className="select select-bordered w-full" name="priority" required>
                            {
                                priorityLevels.map((level, index) => <option
                                key={index} value={level}
                                >{level}</option>)
                            }
                        </select>
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 mb-5">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Choose Team</span>
                    </label>
                    <label className="input-group">
                        <select className="select select-bordered w-full" name="chooseTeam"
                           onChange={handleTeamMembers}
                          required>
                                {
                                    myTeams.map((team, index) =>
                                        <option
                                        key={index} value={team.tname}
                                        >{team.tname}</option>)
                                    
                                }
                        </select>
                    </label>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Assign To</span>
                    </label>
                    <label className="input-group">
                        <span>Assign</span>
                        <select className="select select-bordered w-full" name="assignTo" required>
                            {
                                teamMembers.map((user, index) => <option
                                key={index} value={user.user}
                                >{user.user}</option>)
                            }
                        </select>
                    </label>
                </div>
            </div>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <label className="input-group">
                <textarea placeholder="Write Task Description" 
                className="textarea textarea-bordered textarea-lg w-full" name="des" required ></textarea>
                </label>
            </div>
            
         
            <div className="form-control my-4 w-full">
            <input type="submit" value="Create A Task" className="btn  btn-primary w-full"/>
            </div>
        </form>
            </div>
        </>
        
    );
};

export default CreateTask;