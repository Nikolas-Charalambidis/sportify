import React from 'react';
import {CarouselItems} from "../../organisms/homepage/CarouselItems";
import {Services} from "../../organisms/homepage/Services";

export function HomePage() {
    return (
        <div>
            <div id="main-slider">
                <CarouselItems/>
            </div>
            <Services/>
        </div>
    );
}
