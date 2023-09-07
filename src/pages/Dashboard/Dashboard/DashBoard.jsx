import { useEffect, useState } from "react";
import { getAllTasks } from "../../../utilities/manageTasks";
import { BiTime } from "react-icons/bi";
import moment from "moment";

const DashBoard = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        setTasks(getAllTasks())
    }, [])
    return (
        <div className="px-4">
            <h2 className="text-center text-3xl font-semibold my-5">All Tasks : {tasks.length}</h2>
            <div className="grid gird-cols-1 md:grid-cols-2 gap-4">
                {  tasks &&
                    tasks.map((task, index) => <div className="card w-full bg-base-100 shadow-xl" key={index}>
                    <div className="card-body">
                      <h2 className="card-title">{task.title}</h2>
                      <p>{task.des}</p>
                      <p>Team: <span className="uppercase">{task.team}</span></p>
                      <p>Created By: {task.createdBy}</p>
                      <p>Assigned To: {task.assignTo}</p>
                      <p>Priority Level: <span className="uppercase">{task.priority}</span></p>
                      <div className="divider"></div>
                      <p className="flex items-center gap-2"><BiTime/>
                       Date: {moment(task.date).format("dddd, MMMM Do, YYYY")}</p>
                    </div>
                  </div>)
                }
            </div>
        </div>
    );
};

export default DashBoard;