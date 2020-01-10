import {Breadcrumb} from "react-bootstrap";
import {NavLink as Link} from "react-router-dom";
import React from "react";

export function UserDetailBreadcrumbs() {
    return (
        <Breadcrumb>
            <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
            <li className="breadcrumb-item">
                <span className="active">Uživatelé </span>
            </li>
            <li className="breadcrumb-item">
                <span className="active">Detail uživatele</span>
            </li>
        </Breadcrumb>
    );
}