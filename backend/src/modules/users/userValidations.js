export const validateUserID = (id_user) => {
	if(!id_user){
		throw {status: 400, msg: 'Invalid user ID'};
	}
};

export const validateNewUserData = (email, password1, password2, name, surname) => {
	if(!email || !password1|| !password2  || !name || !surname){
		throw {status: 400, msg: 'Invalid or missing data (email, password1, password2, name, surname)'};
	}
	const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
	if(!emailRegex.test(email)){
		throw {status: 400, msg: 'Invalid email'};
	}
	const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){6}/;
	if(!passwordRegex.test(password1)) {
		throw {status: 400, msg: 'Password does not match the right format. It must contain six chars and at lest one uppercase, one lowercase and one number.'};
	}
	if(password1 !== password2) {
		throw {status: 400, msg: 'Passwords do not match'};
	}
};

export const validateNewUserPasswords = (email, password1, password2, name, surname) => {
	if(!email || !password1|| !password2  || !name || !surname){
		throw {status: 400, msg: 'Invalid or missing data (email, password1, password2, name, surname)'};
	}
};

export const validateChangePasswordData = (id_user, oldPassword, newPassword1, newPassword2) => {
	if(!id_user || !oldPassword || !newPassword1 || !newPassword2){
		throw {status: 400, msg: 'Missing data'};
	}
	if(newPassword1 !== newPassword2) {
		throw {status: 400, msg: 'Passwords do not match'};
	}
};

export const validateChangeUserData = (id_user, name, surname) => {
	if(!id_user || !name || !surname){
		throw {status: 400, msg: 'Invalid or missing data (id_user, name, surname)'};
	}
};
