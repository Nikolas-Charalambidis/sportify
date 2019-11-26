export const validateNewMemberData = (id_team, id_user, position, status) => {
	if(!id_team || !id_user || !position || !status){
		throw {status: 400, msg: 'Chybějící data pro vytvoření nového člena týmu'};
	}
};

export const validateFilteredTeamMembershipsData = (id_team, id_match, team_membership_status) => {

	const team = Number(id_team);
	if (!team) {
		throw {status: 400, msg: 'Chybějící nebo nevalidní tým'};
	}

	var match;
	if (id_match !== undefined) {
		match = Number(id_match);
		if (!match) {
			throw {status: 400, msg: 'Nevalidní zápas'};
		}
	}

	const status = team_membership_status;
	const validStatus = status === undefined || ['active', 'inactive', 'pending', 'declined'].includes(status);
	if (!validStatus) {
		throw {status: 400, msg: 'Nevalidní stav'};
	}

	return {team, match, status};
};