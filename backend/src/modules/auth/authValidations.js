export const validateLoginData = (email, password) => {
	if(!email || !password){
		throw {status: 400, msg: 'Chybějící data'};
	}
};

export const validateConfirmEmailData = (id_user, hash) => {
	if(!id_user || !hash){
		throw {status: 400, msg: 'Chybějící data'};
	}
};

export const validateResetPasswordData = (id_user, hash, password1, password2) => {
	if(!id_user || !hash || !password1 || !password2){
		throw {status: 400, msg: 'Chybějící data'};
	}
	const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){6}/;
	if(!passwordRegex.test(password1)) {
		throw {status: 400, msg: 'Heslo neodpovídá požadovanému formátu. Heslo musí mít alespoň 6 znaků a obsahovat alespoň 1 velké písmeno, 1 malé písmeno a jedno číslo.'};
	}
	if(password1 !== password2) {
		throw {status: 400, msg: 'Hesla se neshodují'};
	}
};

export const validateResetLinkData = (email) => {
	if(!email){
		throw {status: 400, msg: 'Chybějící data'};
	}
};

export const validateResendTokenData = (id_token, type) => {
	if(!id_token || !type){
		throw {status: 400, msg: 'Chybějící data'};
	}
};
