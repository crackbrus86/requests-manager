import React from "react";
import {render} from "react-dom";
import Regions from "./views/layout";

jQuery('a[href="#regions"]').live("click", () => {
    render(<Regions />, document.getElementById("regions-app"));
});