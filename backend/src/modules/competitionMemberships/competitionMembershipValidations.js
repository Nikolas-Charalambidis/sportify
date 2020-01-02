export const validateNewTeamData = (id_competition, id_team, status) => {
	if (!id_competition || !id_team || !status) {
		throw {status: 400, msg: 'Chybějící data pro vytvoření nového týmu v soutěži'};
	}
	if (!['active', 'inactive', 'pending', 'declined'].includes(status)) {
		throw {status: 400, msg: 'Nevalidní stav'};
	}
};

export const validateRemoveTeamData = (id_competition, id_team) => {
	if (!id_competition || !id_team) {
		throw {status: 400, msg: 'Chybějící data pro odstranění týmu ze soutěže'};
	}
};

export const validateCompetitionMembershipsData = (id_competition, id_team, competition_membership_status) => {

	var competition;
	if (id_competition !== undefined) {
		competition = Number(id_competition);
		if (!competition) {
			throw {status: 400, msg: 'Chybějící nebo nevalidní soutěž'};
		}
	}

	const team = Number(id_team);
	if (!team) {
		throw {status: 400, msg: 'Chybějící nebo nevalidní tým'};
	}

	const status = competition_membership_status;
	const validStatus = status === undefined || ['active', 'inactive', 'pending', 'declined'].includes(status);
	if (!validStatus) {
		throw {status: 400, msg: 'Nevalidní stav'};
	}

	return {competition, team, status};
};