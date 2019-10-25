import React from 'react';

import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export function MainSection({children}) {
	return (
		<Container className="mt-3">
			<section>{children}</section>
		</Container>
	);
}
