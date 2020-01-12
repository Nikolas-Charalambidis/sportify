import React from 'react';
import {OverlayTrigger} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tooltip from "react-bootstrap/Tooltip";

export function OverlayTriggerTable({header, message, placement, icon, ...props}) {

    function renderTooltip() {
        return <Tooltip className="tableTooltip" {...props}>{message}</Tooltip>;
    }

    return (
        <div>
            <OverlayTrigger
                placement={placement}
                overlay={renderTooltip()}
            >
                <span>{header} <FontAwesomeIcon icon={icon} className="ml-2" size="1x"/></span>
            </OverlayTrigger>
        </div>
    );
}