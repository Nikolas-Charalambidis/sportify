export const validateTeamID = (team_id) => {
	if(!team_id ){
		throw {status: 400, msg: 'Chybějící data'};
	}
};

export const validateNewTeamData = (sport, name, type, leader) => {
	if(!sport || !name || !type || !leader){
		throw {status: 400, msg: 'Chybějící data'};
	}
};

export const validateChangeTeamData = (id_team, name, id_type, id_sport, id_contact_person, id_leader) => {
	if(!id_team || !name || !id_type || !id_sport || !id_contact_person || !id_leader){
		throw {status: 400, msg: 'Chybějící data'};
	}
};

export const validateSetActive = (active) => {
	if (typeof active !== "boolean"){
		throw {status: 400, msg: 'Chybějící data'};
	}
};
