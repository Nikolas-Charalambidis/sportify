import {Breadcrumb} from "react-bootstrap";
import {NavLink as Link} from "react-router-dom";
import React from "react";

export function CompetitionListAdminBreadcrumbs() {
    return (
        <Breadcrumb>
            <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
            <li className="breadcrumb-item"><Link to="/administration">Administrace</Link></li>
            <li className="breadcrumb-item"><span className="active">Moje soutěže</span></li>
        </Breadcrumb>
    );
}