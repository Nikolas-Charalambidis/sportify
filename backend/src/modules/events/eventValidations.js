export const validateEventID = (id_event) => {
	if(!id_event){
		throw {status: 400, msg: 'Chybějící nebo chybné ID eventu'};
	}
};

export const validateChangeShotsData = (id_event, value) => {
	if(!id_event || !value){
		throw {status: 400, msg: 'Chybějící nebo chybná data'};
	}
};
