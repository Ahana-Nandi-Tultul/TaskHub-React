

const setUsers = (email) => {
    if(email){
        const savedUsers = localStorage.getItem('users');
        let users = []
        if(savedUsers){
            users = JSON.parse(savedUsers)
            // console.log(users)
            const existingUser = users.find(user => user === email)
            // console.log(existingUser);
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

const setBio = (email, bio) => {
    const savedBio = localStorage.getItem('bio');
    let allBio = [];
    if(savedBio){
        allBio = JSON.parse(savedBio);
        allBio = [...allBio , {email, bio}]
    }
    else{
        allBio.push({email, bio})
    }
    localStorage.setItem('bio', JSON.stringify(allBio));
    return;
}

const getProfile = (email) => {
    const savedBio = localStorage.getItem('bio');
    let user;
    if(savedBio){
        const allBio = JSON.parse(savedBio);
        user = allBio.find(user => user.email === email);
        console.log(user, email, allBio);
        return user;
    }
    else{
        return {};
    }
}

export {
    setUsers,
    getUsers,
    setBio,
    getProfile
}