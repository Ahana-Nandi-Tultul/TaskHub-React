const createTask = (task) => {
    const savedTasks = localStorage.getItem('tasks')
    let allTasks = []
    if(savedTasks){
        allTasks = JSON.parse(savedTasks);
        allTasks = [...allTasks, task];
    }
    else{
        allTasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(allTasks));
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

const changeStatusToCompleted = title => {
    const savedTasks = localStorage.getItem('tasks');
    let tasks = [];
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        let myTasks = tasks.find(task => task.title === title)
        // console.log(userEmail, tasks, myTasks)
        myTasks.status = 'completed';
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

const deleteTitle = title => {
    const savedTeams = localStorage.getItem('tasks');
    const teams = JSON.parse(savedTeams);
    
    const remaining = teams.filter(team => team.title !== title);
    localStorage.setItem('tasks', JSON.stringify(remaining))
}

export {
    createTask,
    getMyTasks,
    changeStatusToCompleted,
    getMyCreatedTasks,
    getOneTask,
    updateTask,
    deleteTitle
}