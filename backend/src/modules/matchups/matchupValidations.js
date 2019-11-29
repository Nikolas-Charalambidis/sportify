export const validateAddPlayerData = (values, id_match) => {
	let { goalkeeper, id_team, id_user, host } = values;
	id_match = Number(id_match);
	id_team = Number(id_team);
	id_user = Number(id_user);

	if(
		!id_team ||
		!id_user ||
		!goalkeeper === undefined ||
		!host === undefined ||
		!id_match
	){
		throw {status: 400, msg: 'Chybějící nebo chybná data'};
	}
	return { goalkeeper, id_team, id_user, host, id_match };
};

export const validateDeleteFromMatchupData = (id_matchup, id_user) => {
	if(!id_matchup || !id_user ){
		throw {status: 400, msg: 'Chybějící nebo nevalidní data'};
	}
};

export const validateSetGoalkeeperData = (id_matchup, goalkeeper) => {
	if(!id_matchup || goalkeeper === undefined ){
		throw {status: 400, msg: 'Chybějící nebo nevalidní data'};
	}
};
