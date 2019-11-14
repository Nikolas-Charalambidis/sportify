export const validateTeamID = (id_team) => {
	if(!id_team){
		throw {status: 400, msg: 'Chybějící nebo nevalidní ID týmu'};
	}
};
