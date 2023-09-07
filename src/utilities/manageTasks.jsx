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

export {
    createTask,
    getMyTasks,
    changeStatusToCompleted
}