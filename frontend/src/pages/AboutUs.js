import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';

export function AboutUs() {
	return (
		<>
			<TopNavigation/>
			<MainSection>
				<Heading>O nás</Heading>
				<p>This page is empty for now...</p>
			</MainSection>
		</>
	);
}
