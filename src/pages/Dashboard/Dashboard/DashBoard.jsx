import { useEffect, useState } from "react";
import { getAllTasks } from "../../../utilities/manageTasks";
import { BiTime } from "react-icons/bi";
import moment from "moment";
import { Helmet } from "react-helmet-async";

const DashBoard = () => {
    const [tasks, setTasks] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const tasksPerPage = 4;
    useEffect(() => {
        setTasks(getAllTasks())
    }, [])

    const totalTasks = tasks.length;
    const totalPages = Math.ceil(totalTasks / tasksPerPage);
    const indexOfLastTask = (currentPage + 1) * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const pagesNumbers = [...Array(totalPages).keys()];

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Helmet>
                <title>TaskHub || Dashboard</title>
            </Helmet>
            <div className="px-4" data-aos="fade-down">
            <h2 className="text-center text-3xl font-semibold my-5">All Tasks : {tasks.length}</h2>
            <div className="divider"></div>
            <div className="grid gird-cols-1 md:grid-cols-2 gap-4">
                {  tasks &&
                    currentTasks.map((task, index) => <div className="card w-full bg-base-100 shadow-xl" key={index}>
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
           <div className="my-10 flex justify-center"> 
                <div>
                    {pagesNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageClick(number)}
                        className={`btn ${currentPage === number ? 'active' : ''}`}
                    >
                        {number+1}
                    </button>
                    ))}
                </div>
           </div>
        </div>
        </>
        
    );
};

export default DashBoard;