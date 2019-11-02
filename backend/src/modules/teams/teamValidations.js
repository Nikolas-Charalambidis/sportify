export const validateTeamID = (team_id) => {
	if(!team_id ){
		throw {status: 400, msg: 'Missing data'};
	}
};

export const validateNewTeamData = (sport, name, type, leader) => {
	if(!sport || !name || !type || !leader){
		throw {status: 400, msg: 'Missing data'};
	}
	teamTypeValidation(type);
};

export const validateChangeTeamData = (id_team, name, type, id_sport, id_contact_person) => {
	if(!id_team || !name || !type || !id_sport || !id_contact_person){
		throw {status: 400, msg: 'Missing data'};
	}
	teamTypeValidation(type);
};

function teamTypeValidation(type) {
	if(type !== 'profi' && type !== 'amatéři'){
		throw {status: 400, msg: 'Invalid type of team. Can be "profi" or "amatéři"'};
	}
}