import {Breadcrumb} from "react-bootstrap";
import {NavLink as Link} from "react-router-dom";
import React from "react";

export function TeamDetailBreadcrumbs({teamName}) {
    return (
        <Breadcrumb>
            <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
            <li className="breadcrumb-item"><Link to="/teams">Týmy</Link></li>
            <li className="breadcrumb-item"><span className="active">{teamName}</span></li>
        </Breadcrumb>
    );
}