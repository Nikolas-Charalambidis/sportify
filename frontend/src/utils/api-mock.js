import MockAdapter from 'axios-mock-adapter';
import {mocks, getMockUserDetailPage} from './mocks';

const MOCK_API_DELAY = 500;

export function installApiMocks(api) {
	const mockAdapter = new MockAdapter(api, {delayResponse: MOCK_API_DELAY});

	// UserDetailPage
	mocks.users.forEach(({screenName}) => {
		mockAdapter.onGet(`/api/v1/user/${screenName}`).reply(200, {
			user: getMockUserDetailPage(screenName, mocks),
		});
	});

	// SignInPage
	mockAdapter.onPost('/api/v1/auth/signin').reply(200, {
		token: 'mock-token',
		user: mocks.users[0],
	});

	// all other
	mockAdapter.onAny().passThrough();
}
