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
