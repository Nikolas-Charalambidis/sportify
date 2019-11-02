export const validateTeamID = (team_id) => {
	if(!team_id ){
		throw {status: 400, msg: 'Chybějící data'};
	}
};

export const validateNewTeamData = (sport, name, type, leader) => {
	if(!sport || !name || !type || !leader){
		throw {status: 400, msg: 'Chybějící data'};
	}
	teamTypeValidation(type);
};

export const validateChangeTeamData = (id_team, name, type, id_sport, id_contact_person) => {
	if(!id_team || !name || !type || !id_sport || !id_contact_person){
		throw {status: 400, msg: 'Chybějící data'};
	}
	teamTypeValidation(type);
};

function teamTypeValidation(type) {
	if(type !== 'profi' && type !== 'amatéři'){
		throw {status: 400, msg: 'Chybný typ týmu. Typ může nabývat následujích hodnot "profi" or "amatéři"'};
	}
}