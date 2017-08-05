import React from "react";
import RegionsView from "./regions";
require("../../../css/regions.css");

class Regions extends React.Component{
    render(){
        return <div className="row">
            <div className="col-md-12">
                <RegionsView />
            </div>
        </div>
    }
}
export default Regions;