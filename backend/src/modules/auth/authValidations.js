export const validateLoginData = (email, password) => {
	if(!email || !password){
		throw {status: 400, msg: 'Missing data'};
	}
};

export const validateConfirmEmailData = (id_user, hash) => {
	if(!id_user || !hash){
		throw {status: 400, msg: 'Missing data'};
	}
};

export const validateResetPasswordData = (id_user, hash, password1, password2) => {
	if(!id_user || !hash || !password1 || !password2){
		throw {status: 400, msg: 'Missing data'};
	}
	const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){6}/;
	if(!passwordRegex.test(password1)) {
		throw {status: 400, msg: 'Password does not match the right format. It must contain six chars and at lest one uppercase, one lowercase and one number.'};
	}
	if(password1 !== password2) {
		throw {status: 400, msg: 'Passwords do not match'};
	}
};

export const validateResetLinkData = (email) => {
	if(!email){
		throw {status: 400, msg: 'Missing data'};
	}
};
