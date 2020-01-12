import {Breadcrumb} from "react-bootstrap";
import {NavLink as Link} from "react-router-dom";
import React from "react";

export function MatchEditFormBreadcrumbs({id_team}) {
    return (
        <Breadcrumb>
            <li className="breadcrumb-item">
                <Link to="/">Domů</Link>
            </li>
            <li className="breadcrumb-item">
                <Link to="/administration">Administrace</Link>
            </li>
            <li className="breadcrumb-item">
                <Link to="/administration/teams">Týmy</Link>
            </li>
            <li className="breadcrumb-item">
                <Link to={'/administration/teams/' + id_team}>Detail týmu</Link>
            </li>
            <li className="breadcrumb-item"><span className="active">Detail Zápasu</span></li>
        </Breadcrumb>
    );
}