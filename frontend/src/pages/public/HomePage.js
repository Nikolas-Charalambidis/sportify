import React from 'react';
import {CarouselItems} from "../../organisms/homepage/CarouselItems";
import {Services} from "../../organisms/homepage/Services";
import {Statistics} from "../../organisms/homepage/Statistics";
import {AboutUs} from "../../organisms/homepage/AboutUs";

export function HomePage() {
    return (
        <div>
            <div id="main-slider">
                <CarouselItems/>
            </div>
            <Services/>
            <Statistics/>
            <AboutUs/>
        </div>
    );
}
