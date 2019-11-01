import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import {ScrollToTop} from './atoms/';
import {Flash} from './organisms/Flash';
import {ApiProvider} from './utils/api';
import {AuthProvider} from './utils/auth';
import {Routes} from './Routes';
import EventEmitter from 'events';

function AllProviders({children}) {
	return (
		<AuthProvider>
			<ApiProvider>
				<BrowserRouter>
					<Flash />
					<ScrollToTop/>
					{children}
				</BrowserRouter>
			</ApiProvider>
		</AuthProvider>
	);
}

export function App() {
	window.flash = (message, type="success") => new EventEmitter().emit('flash', ({message, type}));
	return (
		<AllProviders>
			<Routes/>
		</AllProviders>
	);
}
