import React from 'react';
import { Heading } from '../../../atoms';
import { Breadcrumb } from 'react-bootstrap';
import { NavLink as Link } from "react-router-dom";
import { AdministrationMenuCard } from './components/AdministrationMenuCard';
import './AdministrationMenu.scss';

export function AdministrationMenu() {
    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><span className="active">Administrace</span></li>
            </Breadcrumb>
            <Heading className="pageHeading mt-4 mb-5">Administrace</Heading>

            <div className="card-menu-container">
                <AdministrationMenuCard title="Správa profilu" text="Správa profilu zahrnuje editaci Vašeho profilu, zobrazení týmu, ve za které hrajete a seznam všech soutěží" click="profile" />
                <AdministrationMenuCard title="Správa týmů" text="Správa týmů" click="team"/>
            </div>            
        </div>
    );
}