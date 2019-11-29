import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import {NavLink as Link} from "react-router-dom";

export function MatchInteractiveCreateForm() {

    return (
    <div>
        <Breadcrumb>
            <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
            <li className="breadcrumb-item"><Link to="/administration">Administrace</Link></li>
            <li className="breadcrumb-item"><span className="active">Interaktivní zápas</span></li>
        </Breadcrumb>
    </div>
    );
}
