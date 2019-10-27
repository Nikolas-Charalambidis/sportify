export const validateTeamID = (team_id) => {
	if(!team_id ){
		throw {status: 400, msg: 'Missing data'};
	}
};

export const validateNewTeamData = (sport, name, leader) => {
	if(!sport || !name || !leader){
		throw {status: 400, msg: 'Missing data'};
	}
};
