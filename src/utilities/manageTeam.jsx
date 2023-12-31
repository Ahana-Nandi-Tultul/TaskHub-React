const createTeam = (team) => {
    const savedTeams = localStorage.getItem('teams')
    let teams = []
    if(savedTeams){
        teams = JSON.parse(savedTeams);
        const existTeam = teams.find(tm => tm.tname === team.tname)
        if(!existTeam){
            teams = [...teams, team];
        }
    }
    else{
        teams.push(team);
    }
    localStorage.setItem('teams', JSON.stringify(teams));
}

const getMyTeams = (email) => {
    const savedTeams = localStorage.getItem('teams')
    let teams = [];
    if(savedTeams){
        teams = JSON.parse(savedTeams);
        const myTeams = teams.filter(team   => team.towner === email);
        // console.log(teams, email, myTeams);
        return myTeams;
    }
    else{
        return [];
    }
}

const getOneTeam = tname => {
    const savedTeams = localStorage.getItem('teams');
    let teams = [];
    
    teams = JSON.parse(savedTeams);
    const team = teams.find(team => team.tname === tname)
    // console.log(tname, teams);
    return team;
    
}

const updateTeam = (tname, team) => {
    // console.log(tname);
    const savedTeams = localStorage.getItem('teams');
    const teams = JSON.parse(savedTeams);
    
    const remaining = teams.filter(team => team.tname !== tname);
    console.log(remaining);
    const newTeams = [team, ...remaining];

    localStorage.setItem('teams', JSON.stringify(newTeams))
    
}

const deleteTeam = tname => {
    const savedTeams = localStorage.getItem('teams');
    const teams = JSON.parse(savedTeams);
    
    const remaining = teams.filter(team => team.tname !== tname);
    localStorage.setItem('teams', JSON.stringify(remaining))
}

const myTeamsByInvitations = (name) => {
    const savedTeams = localStorage.getItem('teams');
    const teams = JSON.parse(savedTeams);
    
    // console.log(name)
    let mySavedTeams = []
    if(teams){
         mySavedTeams = teams.filter((item) =>

        item.teamMembers.some((member) => member.user === name)
        )
    }
   
    // console.log(mySavedTeams)
        return mySavedTeams;
  
}

const acceptTeam = (tname, email) => {
    const savedTeams = localStorage.getItem('teams');
    const teams = JSON.parse(savedTeams);
    
    let acceptedTeam = teams.find(team => team.tname === tname)
    acceptedTeam.teamMembers.forEach(user => {
        if(user.user === email){
            user.accepted = 1;
        }
    })
    const remaining  = teams.filter(team => team.tname !== tname);
    const newTeams = [acceptedTeam, ...remaining];
    localStorage.setItem('teams', JSON.stringify(newTeams))

}

const getMyTeamsAsMembers = (email) => {
    const savedTeams = localStorage.getItem('teams');
    const teams = JSON.parse(savedTeams);
    let mySavedTeams = []
    if(teams){     
    mySavedTeams = teams.filter((item) =>
    item.teamMembers.some((member) => member.user === email)
    )
    // const ifTOwner = teams.filter(team => team.towner === username) 
    // mySavedTeams.push(...ifTOwner)

    }
    return mySavedTeams
}

const getTeamMembers = teamName => {
    const savedTeams = localStorage.getItem('teams');
    const teams = JSON.parse(savedTeams);
    let thatTeam;
    let acceptedTeamReq;
    if(teams){
        thatTeam = teams.find(team => team.tname === teamName);
        acceptedTeamReq = thatTeam.teamMembers.filter(member => member.accepted === 1 )
        // acceptedTeamReq.push({user: thatTeam.townerEmail})
        console.log(acceptedTeamReq)
    }

    return acceptedTeamReq;
}

export {
    createTeam,
    getMyTeams,
    getOneTeam,
    updateTeam,
    deleteTeam,
    myTeamsByInvitations,
    acceptTeam,
    getMyTeamsAsMembers,
    getTeamMembers
}