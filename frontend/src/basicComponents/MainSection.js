import React from 'react';
import {useHistory} from 'react-router-dom';
import {Container} from "react-bootstrap";

export function MainSection({children}) {
    let history = useHistory();
    const pathName = history.location.pathname;

    return (
        <div>
            {(pathName === '/') ?
                <div className="container-fluid homepageSection">
                    <section>{children}</section>
                </div> :
                <Container className="mainSection mt-3">
                    <section>{children}</section>
                </Container>}
        </div>
    );
}
