export const validateMatchId = (id_match) => {
	if(!id_match){
		throw {status: 400, msg: 'Chybějící nebo nevalidní ID zápasu'};
	}
};

export const validateCreateMatchData = (competition_id, id_host, id_guest, date) => {
	if(competition_id === undefined || !id_host || !id_guest || !date){
		throw {status: 400, msg: 'Chybějící nebo nevalidní data pro vytvoření zápasu'};
	}
};
