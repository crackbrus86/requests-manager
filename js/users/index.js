import React from "react";
import {render} from "react-dom";
import UsersApp from "./views/layout";

jQuery('a[href="#athletes"]').on("click", () => {
    render(<UsersApp update={true} />, document.getElementById("users-app"));
});