import dotenv from 'dotenv';
import { DB_CONNECTION_KEY } from '../../libs/connection';

dotenv.config();
dotenv.config({ path: '.env' });

const { MOCK } = process.env;

const data = [
	{
		id_user: 1,
		email: 'user01@sportify.cz',
		password: 'password',
		name: 'User',
		surname: '01'
	}, {
		id_user: 2,
		email: 'user02@sportify.cz',
		password: 'password',
		name: 'User',
		surname: '02'
	}
];

const service = {
	findUserById: function(id_user) {
		return {data: "NO DATABASE IMPLEMENTED YET"};
	},

	allUsers: function() {
		return [{data: "NO DATABASE IMPLEMENTED YET"}];
	}
};

const serviceMock = {
	findUserById: function(id_user) {
		return data.find(user => user.id_user === Number(id_user));
	},

	allUsers: function() {
		return data;
	}
};

var exportedService;
if (MOCK.toLowerCase() === 'true') {
	exportedService = serviceMock;
	console.log("[mocked]      userService");
} else {
	exportedService = service;
	console.log("[initialized] userService");
}

export default exportedService;
