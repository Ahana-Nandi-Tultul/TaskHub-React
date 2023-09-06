

const setUsers = (email) => {
    if(email){
        const savedUsers = localStorage.getItem('users');
        let users = []
        if(savedUsers){
            users = JSON.parse(savedUsers)
            console.log(users)
            const existingUser = users.find(user => user === email)
            console.log(existingUser);
            if(!existingUser){
                users = [...users, email];
            }
        }
        else{
            users.push(email)
        }
        
        localStorage.setItem('users', JSON.stringify(users))
    }
}

const getUsers = () => {
    const savedUsers = localStorage.getItem('users');
    if(savedUsers){
        let users = JSON.parse(savedUsers)
        return users
    }
    return null;
    
}

export {
    setUsers,
    getUsers
}