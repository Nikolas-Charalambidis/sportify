import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';

export function Contact() {
	return (
		<>
			<TopNavigation/>
			<MainSection>
				<Heading>Kontakt</Heading>
				<p>This page is empty for now...</p>
			</MainSection>
		</>
	);
}
