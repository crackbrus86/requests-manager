import React from "react";
import {render} from "react-dom";
import RequestsApp from "./views/layout";

render(<RequestsApp update={false} />, document.getElementById("requests-app"));

jQuery('a[href="#requests"]').on('click', () => {
    render(<RequestsApp update={true} />, document.getElementById("requests-app"));
});