import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';

export function Login() {
	return (
		<div>
			<TopNavigation/>
			<MainSection>
				<Heading>Login</Heading>
			</MainSection>
		</div>
	);
}
