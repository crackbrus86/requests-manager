import React from "react";
import {render} from "react-dom";
import CoachesApp from "./views/layout";

jQuery('a[href="#coaches"]').live("click", () => {
    render(<CoachesApp  update={true} />, document.getElementById("coaches-app"));
});