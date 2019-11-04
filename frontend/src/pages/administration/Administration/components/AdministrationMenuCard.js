import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './AdministrationMenuCard.scss'

export function AdministrationMenuCard({ title, text, click }) {
    let history = useHistory();

    function onRedirect() {
        history.push("/administration/" + click);
    };

    return (
        <div onClick={onRedirect}>
            <Card className="card-container">
                <Card.Body className="card-body">
                    <Card.Text className="card-title">{title}</Card.Text>
                    <Card.Text className="card-text">{text}</Card.Text>
                </Card.Body>
            </Card>
        </div>        
    );
}