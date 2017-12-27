import React from "react";
import {render} from "react-dom";
import NomApp from "./views/layout";

jQuery("a[href='#nominations']").live("click", () => {
    render(<NomApp update={true} />, document.getElementById("nom-app"));
});
