import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { deleteTask, getMyCreatedTasks, getOneTask, updateTask } from "../../../utilities/manageTasks";
import moment from "moment";
import { BiSolidCommentEdit } from "react-icons/bi";
import UpdateModal from "./UpdateModal";
import toast from 'react-hot-toast';
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyCreatedTask = () => {
    const {user} = useContext(AuthContext)
    const [myTasks, setMyTasks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [oneTask, setOneTask] = useState({});
    useEffect(() => {
        const savedTasks = getMyCreatedTasks(user?.displayName)
        setMyTasks(savedTasks)
    }, [user?.displayName])
    const notify = () => toast('Update Task Successfully!!');
    const handleUpdateTask = (event, title) => {
        event.preventDefault();
        const form = event.target;
        const assignTo = form.assignTo.value;
        const date = form.date.value;
        const des = form.des.value;

        const updatedTask = {assignTo, date, des};
        console.log(assignTo, date, des)
        updateTask(title, updatedTask)
        notify();
        const savedTasks = getMyCreatedTasks(user?.displayName)
        setMyTasks(savedTasks)
        setIsOpen(!isOpen);
    } 
    const handleDeleteTask = title => {
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
                deleteTask(title)
                const savedTasks = getMyCreatedTasks(user?.displayName)
                setMyTasks(savedTasks)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })

    }
    const handleUpdateTaskFatch = title => {
        event.preventDefault();
        setIsOpen(!isOpen);
        const task = getOneTask(title)
        console.log(task);
        setOneTask(task);
    }
    return (
        <>
            <Helmet>
                <title>TaskHub || My Created Tasks</title>
            </Helmet>
            <div className="w-full">
                <h2 className="text-3xl text-center my-5 font-semibold">My Created Tasks</h2>
                <div className="divider"></div>
                <div className="">
                    <table className="table" style={{overflowX: 'scroll'}}>
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Task Titile</th>
                            <th>Create By</th>
                            <th>Assign To</th>
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
                                <td>
                                    <button className="btn btn-circle btn-outline" onClick={() => handleDeleteTask(task.title)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </td>
                                <td>{index+1}</td>
                                <td>{task.title}</td>
                                <td>{task.createdBy}</td>
                                <td>{task.assignTo}</td>
                                <td className="uppercase">{task.team}</td>
                                <td>{task.priority}</td>
                                <td>{moment(task.date).format("dddd, MMMM Do YYYY")}</td>
                                <td>{task.des.slice(0, 30)}</td>
                                <td className="uppercase">{task.status}</td>
                                <td>
                                        
                                    <button onClick={() => handleUpdateTaskFatch(task.title)} 
                                    className="btn bg-green-700 text-white" disabled={ task.status == 'completed' ? true : false}>
                                        <BiSolidCommentEdit className="w-6 h-6"/></button>
                                        
                                </td>
                                
                            </tr>)
                        }
                        
                        
                        </tbody>
                    </table>
                    <UpdateModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    handleUpdateTask = {handleUpdateTask}
                    oneTask = {oneTask}
                    ></UpdateModal>
                </div>
            </div>
        </>
       
    );
};

export default MyCreatedTask;