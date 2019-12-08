export const validateNewMemberData = (id_team, id_user, position, status) => {
	if (!id_team || !id_user || !position || !status) {
		throw {status: 400, msg: 'Chybějící data pro vytvoření nového člena týmu'};
	}
	if (!['active', 'inactive', 'pending', 'declined'].includes(status)) {
		throw {status: 400, msg: 'Nevalidní stav'};
	}
};

export const validateTeamMembershipsData = (id_team, id_user, id_match, team_membership_status, id_position) => {

	const team = Number(id_team);
	if (!team) {
		throw {status: 400, msg: 'Chybějící nebo nevalidní tým'};
	}

	var user;
	if (id_user !== undefined) {
		user = Number(id_user);
		if (!user) {
			throw {status: 400, msg: 'Nevalidní uživatel'};
		}
	}

	var match;
	if (id_match !== undefined) {
		match = Number(id_match);
		if (!match) {
			throw {status: 400, msg: 'Nevalidní zápas'};
		}
	}

	var position;
	if (id_position !== undefined) {
		position = Number(id_position);
		if (!position) {
			throw {status: 400, msg: 'Nevalidní id pozice'};
		}
	}

	const status = team_membership_status;
	const validStatus = status === undefined || ['active', 'inactive', 'pending', 'declined'].includes(status);
	if (!validStatus) {
		throw {status: 400, msg: 'Nevalidní stav'};
	}

	return {team, user, match, status, position};
};