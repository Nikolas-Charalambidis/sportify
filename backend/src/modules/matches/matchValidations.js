export const validateMatchId = (id_match) => {
	if(!id_match){
		throw {status: 400, msg: 'Chybějící nebo nevalidní ID zápasu'};
	}
};
