import React from "react";
import {Heading} from "./Heading";

export function DataLoadingError({header}) {
    return (
        <div>
            {header && header}
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>
        </div>
    )
}