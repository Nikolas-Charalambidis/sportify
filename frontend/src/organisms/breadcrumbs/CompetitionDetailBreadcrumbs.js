import {Breadcrumb} from "react-bootstrap";
import {NavLink as Link} from "react-router-dom";
import React from "react";

export function CompetitionDetailBreadcrumbs() {
    return (
        <Breadcrumb>
            <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
            <li className="breadcrumb-item"><Link to="/competitions">Soutěže</Link></li>
            <li className="breadcrumb-item"><span className="active">Detail soutěže</span></li>
        </Breadcrumb>
    );
}