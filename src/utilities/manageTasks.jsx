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

export {
    createTask
}