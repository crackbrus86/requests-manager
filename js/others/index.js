import React from "react";
import {render} from "react-dom";
import OthersView from "./views/layout";

jQuery('a[href="#others"]').on("click", () => {
    render(<OthersView />, document.getElementById("others-app"));
});