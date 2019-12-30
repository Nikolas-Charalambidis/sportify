import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Heading} from "../../basicComponents";
import React from "react";
import { formatDate } from "../../utils/date"
import {mapSportToIcon} from "../../utils/mapper";
import * as Icons from "@fortawesome/free-solid-svg-icons";

export function CompetitionData({state}) {
    return (
        <Row className="mb-5 teamDetailDesc align-items-center h-100">
            <Col md={{span: 2, offset: 0}} xs={6}>
                <p>Sport  <FontAwesomeIcon className="ml-2" icon={mapSportToIcon(state.competition_data.sport)} size="1x"/></p>
                <Heading size="xs">
                    {state.competition_data.sport}
                </Heading>
            </Col>

            <Col md={3} xs={6}>
                <p>Město  <FontAwesomeIcon className="ml-2" icon={Icons.faCity} size="1x"/></p>
                <Heading size="xs">
                    {state.competition_data.city}
                </Heading>
            </Col>

            <Col md={3} sm={6} xs={12} className="mt-sm-0 mt-3">
                <p>Typ<FontAwesomeIcon className="ml-2" icon={Icons.faBullseye} size="1x"/></p>
                <Heading size="xs">{state.competition_data.type}</Heading>
            </Col>

            <Col className="mt-sm-0 mt-3" md={2}  sm={6} xs={6}>
                <p>Začátek<FontAwesomeIcon className="ml-2" icon={Icons.faHourglassStart} size="1x"/></p>
                <Heading size="xs">
                    {formatDate(state.competition_data.start_date)}
                </Heading>
            </Col>

            <Col className="mt-sm-0 mt-3" md={2} sm={6} xs={6}>
                <p>Konec <FontAwesomeIcon className="ml-2" icon={Icons.faHourglassEnd} size="1x"/></p>
                <Heading size="xs">
                    {formatDate(state.competition_data.end_date)}
                </Heading>
            </Col>
        </Row>
    )
}