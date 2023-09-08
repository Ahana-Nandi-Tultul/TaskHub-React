import { useContext, useEffect, useState } from "react";
import { changeStatusToCompleted, filterTaskByDate, filterTaskByStatus, getMyTasks, sortTasksByDate } from "../../../utilities/manageTasks";
import { AuthContext } from "../../../providers/AuthProvider";
import moment from "moment";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyTasks = () => {
    const {user} = useContext(AuthContext)
    const [myTasks, setMyTasks] = useState([]);
    useEffect(() => {
        const savedTasks = getMyTasks(user?.email)
        setMyTasks(savedTasks)
    }, [user?.email])
    

    const handleTaskStatus = (title, status) => {
        if(status==='pending'){
            changeStatusToCompleted(title, 'inprogress')
            const savedTasks = getMyTasks(user?.email)
            setMyTasks(savedTasks)
        }
        if(status === 'inprogress'){
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
                    changeStatusToCompleted(title, 'completed')
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
        
    }

    const handleFilter = (status, email) => {
        setMyTasks(filterTaskByStatus(status, email))
    }
    const handleFilterByDate = event => {
        event.preventDefault();
        const form = event.target;
        const date = form.date.value;
        // console.log(date)
        if(date){

            setMyTasks(filterTaskByDate(date, user?.email))
        }
        else{
            const savedTasks = getMyTasks(user?.email)
            setMyTasks(savedTasks)
        }

    }

    const handleSortByDate = (sortType) => {
        setMyTasks(sortTasksByDate(sortType, user?.email));
    }

    return (
        <>
            <Helmet>
                <title>TaskHub || My Created Tasks</title>
            </Helmet>
            <div className="w-full px-4" data-aos="fade-down">
            <h2 className="text-3xl text-center my-5 font-semibold">My Tasks</h2>
            <div className="divider"></div>
            <div className="md:flex justify-between my-10">
            <details className="dropdown mb-8">
              <summary className="m-1 btn">Filter By Status</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li><button onClick={() => handleFilter('pending', user?.email)}>Pending</button></li>
                <li><button onClick={() => handleFilter('inprogress', user?.email)}>In Progress</button></li>
                <li><button onClick={() => handleFilter('completed', user?.email)}>Completed</button></li>
              </ul>
            </details>
            <details className="dropdown mb-8">
              <summary className="m-1 btn">Sort By Date</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li><button onClick={() => handleSortByDate('asc')}>Ascending</button></li>
                <li><button onClick={() => handleSortByDate('dsc')}>Descending</button></li>
              </ul>
            </details>

            <form onSubmit={handleFilterByDate} className="mb-8">
                <div className="input-group">
                    <input type="date" name="date" placeholder="Date" className="input input-bordered" />
                    <input className="btn" type="submit" value="Go" />
                </div>
            </form>

            </div>
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
                                task.status === 'completed' && <td>Completed</td>
                            }
                            {
                                !(task.status === 'completed') && <td>
                                    <button onClick={() => handleTaskStatus(task.title, task.status)}
                                className="btn bg-green-800 text-white uppercase"
                                >{task.status}</button> 
                                </td> 
                            }
                        </tr>)
                    }
                    
                    
                    </tbody>
                </table>
            </div>
        </div>
        </>
        
    );
};

export default MyTasks;