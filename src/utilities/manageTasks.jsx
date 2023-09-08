const createTask = (task) => {
    const savedTasks = localStorage.getItem('tasks')
    let allTasks = []
    if(savedTasks){
        allTasks = JSON.parse(savedTasks);
        allTasks = [task, ...allTasks];
    }
    else{
        allTasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(allTasks));
    return;
}

const getMyTasks = (userEmail) => {
    const savedTasks = localStorage.getItem('tasks')
    let tasks = []
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        const myTasks = tasks.filter(task => task.assignTo === userEmail)
        // console.log(userEmail, tasks, myTasks)
        return myTasks;
    }
    else{
        return []
    }
}

const changeStatusToCompleted = (title, status) => {
    const savedTasks = localStorage.getItem('tasks');
    let tasks = [];
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        let myTasks = tasks.find(task => task.title === title)
        // console.log(userEmail, tasks, myTasks)
        myTasks.status = status;
        const remaining = tasks.filter(task => task.title !== title);
        tasks = [myTasks, ...remaining];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

const getMyCreatedTasks = userName => {
    const savedTasks = localStorage.getItem('tasks')
    let tasks = []
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        const myTasks = tasks.filter(task => task.createdBy === userName)
        // console.log(userEmail, tasks, myTasks)
        return myTasks;
    }
    else{
        return []
    }
}

const getOneTask = title => {
    const savedTasks = localStorage.getItem('tasks')
    let tasks = []
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        const onetask = tasks.find(task => task.title === title)
        console.log(title, tasks, onetask)
        return onetask;
    }
    else{
        return;
    }
}

const updateTask = (title, updatedTask) =>{
    const savedTasks = localStorage.getItem('tasks')
    let tasks = []
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        const onetask = tasks.find(task => task.title === title)
        console.log(updatedTask)
       onetask.assignTo = updatedTask.assignTo;
       onetask.date = updatedTask.date;
       onetask.des = updatedTask.des;
       const remaining = tasks.filter(task => task.title !== title);
       const newTasks = [onetask, ...remaining];
       localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
    return ;
}

const deleteTask = title => {
    const savedTeams = localStorage.getItem('tasks');
    const teams = JSON.parse(savedTeams);
    
    const remaining = teams.filter(team => team.title !== title);
    localStorage.setItem('tasks', JSON.stringify(remaining))
}

const filterTaskByStatus = (status, email) => {
    const savedTasks = localStorage.getItem('tasks')
    let specificTasks = []
    if(savedTasks){
        const tasks = JSON.parse(savedTasks);
        const tasksOfUser = tasks.filter(task => task.assignTo === email)
        specificTasks = tasksOfUser.filter(task => task.status === status)
    }
    return specificTasks;
}
const filterTaskByDate = (date, email) => {
    const savedTasks = localStorage.getItem('tasks')
    let specificTasks = []
    if(savedTasks){
        const tasks = JSON.parse(savedTasks);
        const tasksOfUser = tasks.filter(task => task.assignTo === email)
        specificTasks = tasksOfUser.filter(task => task.date === date)
    }
    return specificTasks;
}

const sortTasksByDate = (sortType, email) => {
    const savedTasks = localStorage.getItem('tasks')
    let sorted = []
    if(savedTasks){
        const tasks = JSON.parse(savedTasks);
        const tasksOfUser = tasks.filter(task => task.assignTo === email)
        if(tasksOfUser){
            sorted = tasksOfUser.sort((a, b) => {
                if (sortType === 'asc') {
                  return a.date.localeCompare(b.date);
                } else {
                  return b.date.localeCompare(a.date);
                }
            })
        }
}
    console.log(sorted);
    return sorted;
}

const getAllTasks = () => {
    const savedTasks = localStorage.getItem('tasks')
    let tasks = []
    if(savedTasks){
         tasks = JSON.parse(savedTasks);
    }
    return tasks
}

export {
    createTask,
    getMyTasks,
    changeStatusToCompleted,
    getMyCreatedTasks,
    getOneTask,
    updateTask,
    deleteTask,
    filterTaskByStatus,
    filterTaskByDate,
    sortTasksByDate,
    getAllTasks
}