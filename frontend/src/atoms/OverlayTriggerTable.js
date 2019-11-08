import React from 'react';

import {OverlayTrigger} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function OverlayTriggerTable({header, message, placement, icon}) {

    return (
        <div>{header}
            <OverlayTrigger
                placement={placement}
                overlay={<div className="tableTooltip">{message}</div>}
            >
                <FontAwesomeIcon icon={icon} className="ml-2" size="1x"/>
            </OverlayTrigger>
        </div>
    );
}