import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';

export function Fixtures() {
	return (
		<>
			<TopNavigation/>
			<MainSection>
				<Heading>Fixtures</Heading>
				<p>This page is empty for now...</p>
			</MainSection>
		</>
	);
}
