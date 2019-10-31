export const validateUserID = (id_user) => {
	if(!id_user){
		throw {status: 400, msg: 'Missing data'};
	}
};

export const validateNewUserData = (email, password, name, surname) => {
	if(!email || !password || !name || !surname){
		throw {status: 400, msg: 'Missing data'};
	}
};

export const validateEmail = (email) => {
	const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
	if(!emailRegex.test(email)){
		throw {status: 400, msg: 'Invalid email'};
	}
};

export const validateChangePasswordData = (id_user, oldPassword, newPassword1, newPassword2) => {
	if(!id_user || !oldPassword || !newPassword1 || !newPassword2){
		throw {status: 400, msg: 'Missing data'};
	}
};

export const validateChangeUserData = (id_user, name, surname) => {
	if(!id_user || !name || !surname){
		throw {status: 400, msg: 'Missing data'};
	}
};
