export const validateMatchId = (id_match) => {
	if(!id_match){
		throw {status: 400, msg: 'Chybějící nebo nevalidní ID zápasu'};
	}
};

export const validateCreateMatchData = (data) => {
	const { id_competition, id_host, id_guest, date} = data;
	const host_id = Number(id_host);
	const guest_id = Number(id_guest);
	let competition_id = id_competition;
	if(id_competition){
		competition_id = Number(id_competition);
	}

	if(competition_id === undefined || !host_id || !guest_id || !date){
		throw {status: 400, msg: 'Chybějící nebo nevalidní data pro vytvoření zápasu'};
	}
	return {
		id_competition: competition_id,
		id_host: host_id,
		id_guest: guest_id,
		date: date
	}
};
