export const validateNewMemberData = (id_team, id_user, position, status) => {
	if(!id_team || !id_user || !position || !status){
		throw {status: 400, msg: 'Chybějící data pro vytvoření nového člena týmu'};
	}
};
