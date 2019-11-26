import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import {MainSection, ScrollToTop} from './atoms/'
import {Flash} from './atoms/Flash';
import {ApiProvider} from './hooks/useApi';
import {AuthProvider} from './utils/auth';
import {Routes} from './Routes';
import Event from './utils/event';
import {Footer} from "./atoms/Footer";
import {TopNavigation} from "./atoms/TopNavigation";

function AllProviders({children}) {
	return (
		<AuthProvider>
			<ApiProvider>
				<BrowserRouter>
					<ScrollToTop/>
					<TopNavigation/>
					<Flash />
					<MainSection>
						{children}
					</MainSection>
					<Footer/>
				</BrowserRouter>
			</ApiProvider>
		</AuthProvider>
	);
}

export function App() {
	window.flash = (message, type, timeout=4000, link=null) => Event.emit('flash', ({message, type, timeout, link}));
	return (
		<AllProviders>
			<Routes/>
		</AllProviders>
	);
}
