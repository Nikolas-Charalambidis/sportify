import React from 'react';

import "react-datepicker/dist/react-datepicker.css";

import {Heading} from '../../../atoms';
import {Breadcrumb, Row, Col, Image, Tabs, Tab} from 'react-bootstrap';
import {TeamSquad} from "./components/TeamSquad";
import {useGetTeam} from "../../../api/team/teamAPI";

const subTitleContainer = {
    width: '100%',
};

const subTitleLeftLabel = {
    width: '15%',
    color: '#969696',
};

const subTitleRightLabel = {
    fontWeight: '600',
};

export function TeamDetail() {
    const [state] = useGetTeam(1);
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item href="/teams">Týmy</Breadcrumb.Item>
                <Breadcrumb.Item active>Název týmu</Breadcrumb.Item>
            </Breadcrumb>
            <Heading className="pageHeading mt-4 mb-5">Tým 8</Heading>

            {!state.gettingData &&
                <Row>
                    <Col xl={10} lg={12}>
                        <Row>
                            <div style={subTitleContainer}>
                                <label style={subTitleLeftLabel}>Vedoucí týmu:</label>
                                <label style={subTitleRightLabel}><label>{state.team_data.leader}</label></label>
                            </div>
                        </Row>
                        <Row>
                            <div style={subTitleContainer}>
                                <label style={subTitleLeftLabel}>Sport:</label>
                                <label style={subTitleRightLabel}>{state.team_data.sport}</label>
                            </div>
                        </Row>
                        <Row>
                            <div style={subTitleContainer}>
                                <label style={subTitleLeftLabel}>Výhry/Prohry:</label>
                                <label style={subTitleRightLabel}>2/0</label>
                            </div>
                        </Row>
                    </Col>
                    <Col className="d-none d-xl-block">
                        <Image roundedCircle
                               src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfe80083d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfe80083d%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.875%22%20y%3D%2295.2828125%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"/>
                    </Col>
                </Row>
            }

            <Tabs fill defaultActiveKey="squad" id="teamTabs">
                <Tab eventKey="squad" title="Sestava">
                    <TeamSquad teamId={1}/>
                </Tab>
                <Tab eventKey="competition" title="Soutěže">
                </Tab>
                <Tab eventKey="statistics" title="Statistiky">
                </Tab>
            </Tabs>
        </div>
    );
}
