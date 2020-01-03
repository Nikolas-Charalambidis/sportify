import React from "react";
import {Col, Row} from "react-bootstrap";
import {Heading} from "./index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

export function AccountAdvantages() {
    return (
        <Row className="accountAdvantages">
            <Col xl={{span: 10, offset: 1}} lg={{span: 12, offset: 0}}>
                <div className="inner-wrapper">
                    <Heading size="lg" className="text-center pt-4">Výhody uživatelského účtu</Heading>

                    <ul className="bullets">
                        <li>
                            <div className="item-outer-wrapper">
                                <div className="item-wrapper">
                                    <div className="item">
                                        <FontAwesomeIcon className="item-icon" icon={Icons.faEdit} size="1x"/>
                                    </div>
                                </div>
                            </div>
                            <div className="text-col">
                                <p>Editace a správa <strong>osobního profilu</strong>.</p>
                            </div>
                        </li>

                        <li>
                            <div className="item-outer-wrapper">
                                <div className="item-wrapper">
                                    <div className="item">
                                        <FontAwesomeIcon className="item-icon" icon={Icons.faUsers} size="1x"/>
                                    </div>
                                </div>
                            </div>
                            <div className="text-col">
                                <p><strong>Tvorba</strong> vlastního týmu, možnost <strong>akceptace
                                    přihlášek</strong> od ostatních sportovců.</p>
                            </div>
                        </li>

                        <li>
                            <div className="item-outer-wrapper">
                                <div className="item-wrapper">
                                    <div className="item">
                                        <FontAwesomeIcon className="item-icon" icon={Icons.faPencilRuler} size="1x"/>
                                    </div>
                                </div>
                            </div>
                            <div className="text-col">
                                <p>Usnadnění <strong>interaktivního zápisu</strong> každého utkání.</p>
                            </div>
                        </li>

                        <li>
                            <div className="item-outer-wrapper">
                                <div className="item-wrapper">
                                    <div className="item">
                                        <FontAwesomeIcon className="item-icon" icon={Icons.faTrophy} size="1x"/>
                                    </div>
                                </div>
                            </div>
                            <div className="text-col">
                                <p><strong>Správa</strong> a <strong>přehled</strong> uskutečněných soutěží.</p>
                            </div>
                        </li>

                        <li>
                            <div className="item-outer-wrapper">
                                <div className="item-wrapper">
                                    <div className="item">
                                        <FontAwesomeIcon className="item-icon" icon={Icons.faChartBar} size="1x"/>
                                    </div>
                                </div>
                            </div>
                            <div className="text-col">
                                <p>Veškerý <strong>přehled pokroků</strong> tebe i tvého týmu na jednom místě.</p>
                            </div>
                        </li>

                        <li>
                            <div className="item-outer-wrapper">
                                <div className="item-wrapper">
                                    <div className="item">
                                        <FontAwesomeIcon className="item-icon" icon={Icons.faNetworkWired} size="1x"/>
                                    </div>
                                </div>
                            </div>
                            <div className="text-col">
                                <p>Možnost <strong>přihlásit</strong> svůj vlastní tým do vytvořené soutěže.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </Col>
        </Row>
    );
}