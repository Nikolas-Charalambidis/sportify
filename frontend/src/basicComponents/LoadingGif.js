import React from "react";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../assets/images/loading.gif";

export function LoadingGif({header}) {
    return (
        <div>
            {header && header}
            <div className="text-center"><Image src={loadingGif}/></div>
        </div>
    );
}