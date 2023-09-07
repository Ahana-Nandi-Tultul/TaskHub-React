import { useContext, useEffect, useState } from "react";
import { changeStatusToCompleted, getMyTasks } from "../../../utilities/manageTasks";
import { AuthContext } from "../../../providers/AuthProvider";
import moment from "moment";
import Swal from "sweetalert2";

const MyTasks = () => {
    const {user} = useContext(AuthContext)
    const [myTasks, setMyTasks] = useState([]);
    useEffect(() => {
        const savedTasks = getMyTasks(user?.email)
        setMyTasks(savedTasks)
    }, [user?.email])
    

    const handleTaskStatus = (title) => {
        Swal.fire({
            title: 'The task is completed?',
            text: "You won't be able to revert this!",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Done!'
          }).then((result) => {
            if (result.isConfirmed) {
                changeStatusToCompleted(title)
                const savedTasks = getMyTasks(user?.email)
                setMyTasks(savedTasks)
              Swal.fire(
                'Success!',
                'Your tasks has been updated',
                'success'
              )
            }
          })
    }

    return (
        <div className="w-full px-4">
            <h2 className="text-3xl text-center my-5 font-semibold">My Tasks</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Task Titile</th>
                        <th>Create By</th>
                        <th>Team Name</th>
                        <th>Priority Level</th>
                        <th>Due Date</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        myTasks.map((task, index) => <tr
                        key={index}
                        >
                            <td>{index+1}</td>
                            <td>{task.title}</td>
                            <td>{task.createdBy}</td>
                            <td>{task.team}</td>
                            <td>{task.priority}</td>
                            <td>{moment(task.date).format("dddd, MMMM Do YYYY")}</td>
                            <td>{task.des}</td>
                            {
                                task.status && <td>Completed</td>
                            }
                            {
                                !task.status && <td>
                                    <button onClick={() => handleTaskStatus(task.title)}
                                className="btn bg-green-800 text-white"
                                >In Progress</button> 
                                </td> 
                            }
                        </tr>)
                    }
                    
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTasks;