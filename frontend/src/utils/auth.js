import React, {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';

const LOCAL_STORAGE_AUTH_KEY = 'sportify-auth';

const initialState = {
	token: null,
	user_id: null,
};

const AuthContext = createContext(
	createContextValue({
		token: initialState.token,
		user_id: initialState.user_id,
		setState: () =>
			console.error('You are using AuthContext without AuthProvider!'),
	}),
);

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [state, setState] = usePersistedAuth(initialState);

	const contextValue = useMemo(() => {
		const { token, user_id } = state;
		return createContextValue({ token, user_id, setState });
	}, [state, setState]);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}

function createContextValue({ token, user_id, setState }) {
	return {
		token,
		user_id,
		signin: ({ token, user_id }) => setState({ token, user_id }),
		signout: () => setState({ token: null, user_id: null }),
	};
}

function usePersistedAuth(defaultState) {
	const [state, setStateRaw] = useState(() => getStorageState(defaultState));

	const setState = useCallback(newState => {
		setStateRaw(newState);
		setStorageState(newState);
	}, []);

	return [state, setState];
}

function getStorageState(defaultState) {
	if (!window.localStorage) {
		return defaultState;
	}

	const rawData = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
	if (!rawData) {
		return defaultState;
	}

	try {
		const { user_id, token } = JSON.parse(rawData);
		if (token && user_id) {
			return { token, user_id };
		}
	} catch {}

	return defaultState;
}

function setStorageState(newState) {
	if (!window.localStorage) {
		return;
	}

	window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newState));
}