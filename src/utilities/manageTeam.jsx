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
    console.log(tname);
    const savedTeams = localStorage.getItem('teams');
    const teams = JSON.parse(savedTeams);
    
    const remaining = teams.filter(team => team.tname !== tname);
    console.log(remaining);
    const newTeams = [team, ...remaining];

    localStorage.setItem('teams', JSON.stringify(newTeams))
    
}

export {
    createTeam,
    getMyTeams,
    getOneTeam,
    updateTeam
}