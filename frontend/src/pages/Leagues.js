import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';
import {Breadcrumb} from 'react-bootstrap';

export function Leagues() {
	return (
		<div>
			<TopNavigation/>
			<MainSection>
				<Breadcrumb>
					<Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
					<Breadcrumb.Item active href="/leagues">Soutěže</Breadcrumb.Item>
				</Breadcrumb>
				<Heading>Leagues</Heading>
				<p>This page is empty for now...</p>
			</MainSection>
		</div>
	);
}
