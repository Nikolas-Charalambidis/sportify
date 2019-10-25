import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env' });

const { MOCK, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } = process.env;

const data = [
	{
		id_team: 1,
		name: 'Team 01',
		leader: 1
	}, {
		id_team: 2,
		name: 'Team 02',
		leader: 2
	}
];

const service = {
	findTeamById: function(id_team) {
		return {data: "NO DATABASE IMPLEMENTED YET"};
	},

	allTeams: function() {
		return [{data: "NO DATABASE IMPLEMENTED YET"}];
	}
};

const serviceMock = {
	findTeamById: function(id_team) {
		return data.find(team => team.id_team === Number(id_team));
	},

	allTeams: function() {
		return data;
	}
};

var exportedService;
if (MOCK.toLowerCase() === 'true') {
	exportedService = serviceMock;
	console.log("[mocked]      teamService");
} else {
	exportedService = service;
	console.log("[initialized] teamService");
}

export default exportedService;
