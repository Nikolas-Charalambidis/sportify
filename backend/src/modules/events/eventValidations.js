export const validateEventID = (id_event) => {
	if(!id_event){
		throw {status: 400, msg: 'Chybějící nebo chybné ID eventu'};
	}
};

export const validateChangeShotsData = (id_event, value) => {
	if(!id_event || !value){
		throw {status: 400, msg: 'Chybějící nebo chybná data'};
	}
	if (value < 0) {
		throw {status: 400, msg: 'Počet střel nemůže být menší než 0'};
	}
};

export const validateAddEventsData = (values, id_match) => {
	let { id_user, type, id_team, id_assistance1, id_assistance2, minute, value, host } = values;
	if(id_user){
		id_user = Number(id_user);
	}
	if(id_team){
		id_team = Number(id_team);
	}
	if(id_assistance1){
		id_assistance1 = Number(id_assistance1);
	}
	if(id_assistance2){
		id_assistance2 = Number(id_assistance2);
	}
	if(minute){
		minute = Number(minute);
	}
	if(value){
		value = Number(value);
	}
	id_match = Number(id_match);
	if(
		!type ||
		!id_team ||
		!id_user === undefined ||
		!id_assistance1 === undefined ||
		!id_assistance2 === undefined ||
		!minute === undefined ||
		!value === undefined ||
		!host === undefined ||
		!id_match
	){
		throw {status: 400, msg: 'Chybějící nebo chybná data'};
	}
	return { id_user, type, id_team, id_match, id_assistance1, id_assistance2, minute, value, host };
};
