export const validateAddPlayerData = (id_match, id_team, id_user, host) => {
	if(!id_match || !id_team || !id_user || host === undefined ){
		throw {status: 400, msg: 'Chybějící nebo nevalidní data'};
	}
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
