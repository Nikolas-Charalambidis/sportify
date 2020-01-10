import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ShotsChildDetailAdmin} from "../detail/events/ShotsChildDetailAdmin";
import {ShotsChildCreateAdmin} from "../create/events/ShotsChildCreateAdmin";

export function ShotsParent({type, params}) {
    return (
        <Row>
            <Col lg={6} md={12} sm={12} xs={12} >
                {type === "edit" &&
                    <ShotsChildDetailAdmin shotsState={params.shotsStateHost} />
                }
                {type === "create" &&
                    <ShotsChildCreateAdmin  state={params.hostState} setState={params.setHostState} />
                }
            </Col>

            <Col lg={6} md={12} sm={12} xs={12} >
                {type === "edit" &&
                    <ShotsChildDetailAdmin shotsState={params.shotsStateGuest} />
                }
                {type === "create" &&
                    <ShotsChildCreateAdmin state={params.guestState} setState={params.setGuestState}/>
                }
            </Col>
        </Row>
    );
}
