export const validateUserID = (id_user) => {
	if(!id_user){
		throw {status: 400, msg: 'Nevalidní user ID'};
	}
};

export const validateNewUserData = (email, password1, password2, name, surname) => {
	if(!email || !password1|| !password2  || !name || !surname){
		throw {status: 400, msg: 'Chybné nebo chybějící údaje (email, password1, password2, name, surname)'};
	}
	const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
	if(!emailRegex.test(email)){
		throw {status: 400, msg: 'Nevalidní email'};
	}
	const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){6}/;
	if(!passwordRegex.test(password1)) {
		throw {status: 400, msg: 'Heslo neodpovídá požadovanému formátu. Heslo musí mít alespoň 6 znaků a obsahovat alespoň 1 velké písmeno, 1 malé písmeno a jedno číslo.'};
	}
	if(password1 !== password2) {
		throw {status: 400, msg: 'Hesla se neshodují'};
	}
};

export const validateNewUserPasswords = (email, password1, password2, name, surname) => {
	if(!email || !password1|| !password2  || !name || !surname){
		throw {status: 400, msg: 'Chybné nebo chybějící údaje (email, password1, password2, name, surname)'};
	}
};

export const validateChangePasswordData = (id_user, oldPassword, newPassword1, newPassword2) => {
	if(!id_user || !oldPassword || !newPassword1 || !newPassword2){
		throw {status: 400, msg: 'Chybné nebo chybějící údaje'};
	}
	if(newPassword1 !== newPassword2) {
		throw {status: 400, msg: 'Hesla se neshodují'};
	}
};

export const validateChangeUserData = (id_user, name, surname) => {
	if(!id_user || !name || !surname){
		throw {status: 400, msg: 'Chybné nebo chybějící údaje (id_user, name, surname)'};
	}
};

export const validateUploadAvatarData = (id_user, url) => {
	if(!id_user || !url){
		throw {status: 400, msg: 'Chybné nebo chybějící údaje (id_user, url)'};
	}
};
