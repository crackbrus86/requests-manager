import React from "react";
import {render} from "react-dom";
import Categories from "./views/layout";

jQuery('a[href="#categories"]').on('click', () => {
    render(<Categories />, document.getElementById("categories-app"));
});
