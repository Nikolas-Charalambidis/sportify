import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';
import {Footer} from '../organisms/Footer';

export function HomePage() {
	return (
		<div>
			<TopNavigation/>
			<MainSection>
				<Heading>Sportify</Heading>
			</MainSection>
			<Footer/>
		</div>
	);
}
