import React from "react";
import NavbarPage from "../Home/NavbarPage";
import SliderPage from "../Slider/SliderPage";
import FooterPage from "../Footer/FooterPage";
import ListProductPage from "../ListProduct/ListProductPage";
import './LandingPage.css'
import Maps from "../Maps/Maps";

import SizeNike from "../Size/SizeNike";

function LandingPage() {
    return (
        <div>
            <NavbarPage />
            <SliderPage />
            <ListProductPage />
            <SizeNike />
            <Maps />
            
            <FooterPage />
        </div>
    );
}

export default LandingPage;
