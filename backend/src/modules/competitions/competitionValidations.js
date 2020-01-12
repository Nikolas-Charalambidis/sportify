export const validateCompetitionId = (id_competition) => {
	if(!id_competition){
		throw {status: 400, msg: 'Chybějící nebo chybné ID soutěže'};
	}
};

export const validateIsGoalkeeper = (is_goalkeeper) => {
	if (is_goalkeeper !== undefined) {
		if (is_goalkeeper === 'true') {
			const is_gk = 1;
			return { is_gk };
		} else if (is_goalkeeper === 'false') {
			const is_gk = 0;
			return {is_gk};
		} else {
			throw {status: 400, msg: "Hodnota musí být typu boolean"};
		}
	} else {
		const is_gk = undefined;
		return {is_gk};
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

export const validateFilteredCompetitionData = (id_sport, id_type) => {

	var sport;
	if (id_sport !== undefined) {
		sport = Number(id_sport);
		if (!sport) {
			throw {status: 400, msg: 'Nevalidní sport'};
		}
	}

	var type;
	if (id_type !== undefined) {
		type = Number(id_type);
		if (!type) {
			throw {status: 400, msg: 'Nevalidní typ soutěže'};
		}
	}

	return {sport, type};
};

export const validateStatus = (competition_membership_status) => {
	const status = competition_membership_status;
	const validStatus = status === undefined || ['active', 'inactive', 'pending', 'declined'].includes(status);
	if (!validStatus) {
		throw {status: 400, msg: 'Nevalidní stav'};
	}
	return { status };
};