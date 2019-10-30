import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import {ScrollToTop} from './atoms/';
import {Flash} from './organisms/Flash';
import {ApiProvider} from './utils/api';
import {AuthProvider} from './utils/auth';
import {Routes} from './Routes';
import Bus from './utils/Bus';

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
	window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));
	return (
		<AllProviders>
			<Routes/>
		</AllProviders>
	);
}
