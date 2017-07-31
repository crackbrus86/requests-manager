import React from "react";
import {render} from "react-dom";
import Categories from "./views/layout";

jQuery('a[href="#categories"]').live('click', () => {
    render(<Categories />, document.getElementById("categories-app"));
});
