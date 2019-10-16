import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';

export function Leagues() {
	return (
		<>
			<TopNavigation/>
			<MainSection>
				<Heading>Leagues</Heading>
				<p>This page is empty for now...</p>
			</MainSection>
		</>
	);
}
