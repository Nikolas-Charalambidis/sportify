import {parseISO} from 'date-fns';

export const validateCompetitionId = (id_competition) => {
	if(!id_competition){
		throw {status: 400, msg: 'Chybějící nebo chybné ID soutěže'};
	}
};

export const validateNewCompetition = (name, leader, sport, type, city, start, end) => {

	if (start >= end) {
		throw {status: 400, msg: 'Začátek soutěže musí být před koncem soutěže'}
	}

	if (!leader || !sport || !type) {
		throw {status: 400, msg: 'Nevalidní ID kontaktní osoby, sportu nebo tzpu soutěže'}
	}

	if (!name || !city) {
		throw {status: 400, msg: 'Jméno nebo město musí být vyplněno'}
	}
};

export const validateChangeCompetition = (competition, name, leader, city) => {
	if (!name || !city) {
		throw {status: 400, msg: 'Nevalidní název soutěže nebo města'}
	}

	if (!competition || !leader) {
		throw {status: 400, msg: 'Nevalidní ID soutěže nebo vedoucího soutěže'}
	}
};