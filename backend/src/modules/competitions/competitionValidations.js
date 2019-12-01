export const validateCompetitionId = (id_competition) => {
	if(!id_competition){
		throw {status: 400, msg: 'Chybějící nebo chybné ID soutěže'};
	}
};
