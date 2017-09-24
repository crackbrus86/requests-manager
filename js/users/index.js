import React from "react";
import {render} from "react-dom";
import UsersApp from "./views/layout";

jQuery('a[href="#athletes"]').live("click", () => {
    render(<UsersApp />, document.getElementById("users-app"));
});