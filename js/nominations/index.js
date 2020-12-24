import React from "react";
import {render} from "react-dom";
import NomApp from "./views/layout";

jQuery("a[href='#nominations']").on("click", () => {
    render(<NomApp update={true} />, document.getElementById("nom-app"));
});
