export const validateEventID = (id_event) => {
	if(!id_event){
		throw {status: 400, msg: 'Chybějící nebo chybné ID eventu'};
	}
};
