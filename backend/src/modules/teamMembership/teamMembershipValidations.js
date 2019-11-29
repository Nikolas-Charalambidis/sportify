export const validateNewMemberData = (id_team, id_user, position, status) => {
	if(!id_team || !id_user || !position || !status){
		throw {status: 400, msg: 'Chybějící data pro vytvoření nového člena týmu'};
	}
};

export const validateAvailablePlayersData = (id_team, id_match) => {
	if(!id_team || !id_match){
		throw {status: 400, msg: 'Chybějící nebo nevalidní data pro získání dostupných hráčů pro zápas'};
	}
};
