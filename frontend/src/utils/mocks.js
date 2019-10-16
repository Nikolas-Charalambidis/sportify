export const users = [
	{
		id: 1,
		name: 'Young Gatchell',
		screenName: 'yg123',
		profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
	},
	{
		id: 2,
		name: 'Gatchell Young',
		screenName: 'gyoung',
		profileImageUrl: 'http://mrmrs.github.io/photos/p/2.jpg',
	},
	{
		id: 3,
		name: 'John Doe',
		screenName: 'johndoe',
		profileImageUrl: 'http://mrmrs.github.io/photos/p/3.jpg',
	},
	{
		id: 4,
		name: 'Jane Roe',
		screenName: 'janeroe',
		profileImageUrl: 'http://mrmrs.github.io/photos/p/4.jpg',
	},
];

export const mocks = {
	users
};

export function getMockUserDetailPage(screenName, currentMocks = mocks) {

	const user = getMockUser(screenName, currentMocks);
	if (!user) {
		return null;
	}

	return {
		...user
	};
}

export function getMockUser(screenName, currentMocks = mocks) {
	const {users} = currentMocks;

	const user = users.find(user => screenName === user.screenName);
	if (!user) {
		return null;
	}

	return user;
}
