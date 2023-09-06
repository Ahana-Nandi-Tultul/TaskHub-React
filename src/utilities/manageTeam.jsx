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

export {
    createTeam
}