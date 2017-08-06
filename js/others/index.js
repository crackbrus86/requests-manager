import React from "react";
import {render} from "react-dom";
import OthersView from "./views/layout";

jQuery('a[href="#others"]').live("click", () => {
    render(<OthersView />, document.getElementById("others-app"));
});