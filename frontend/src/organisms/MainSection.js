import React from 'react';

import {Container} from "react-bootstrap";

export function MainSection({children}) {
    return (
        <Container className="mainSection mt-3">
            <section>{children}</section>
        </Container>
    );
}
