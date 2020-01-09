import {Breadcrumb} from "react-bootstrap";
import {NavLink as Link} from "react-router-dom";
import React from "react";

export function MatchDetailBreadcrumbs({idTeam}) {
    return (
        <Breadcrumb>
            <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
            <li className="breadcrumb-item"><Link to="/teams">Týmy</Link></li>
            <li className="breadcrumb-item"><Link to={'/teams/' + idTeam}>Detail týmu</Link></li>
            <li className="breadcrumb-item"><span className="active">Detail zápasu</span></li>
        </Breadcrumb>
    );
}