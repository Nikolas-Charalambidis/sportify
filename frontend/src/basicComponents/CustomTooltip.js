import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export function CustomTooltip ({icon, size, text}) {
    return (
        <OverlayTrigger overlay={
            <Tooltip id="tooltip-disabled">
                {text}
            </Tooltip>
        }>
            <FontAwesomeIcon icon={icon} size={size}/>
        </OverlayTrigger>
    )
}