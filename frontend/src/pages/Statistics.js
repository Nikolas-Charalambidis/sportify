import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';
import {Breadcrumb} from "react-bootstrap";

export function Statistics() {
	return (
		<>
			<TopNavigation/>
			<MainSection>
				<Breadcrumb>
					<Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
					<Breadcrumb.Item active>Statistiky</Breadcrumb.Item>
				</Breadcrumb>
				<Heading>Statistiky</Heading>
				<p>This page is empty for now...</p>
			</MainSection>
		</>
	);
}
