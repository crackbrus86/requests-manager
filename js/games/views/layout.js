import React from "react";
import PreCompetition from "./pre-competition";
import Competition from "./competition";
require("../../../css/games.css");

class Games extends React.Component{
    render(){
        return <div className="row">
            <div className="col-md-6">
                <PreCompetition />
            </div>
            <div className="col-md-6">
                <Competition />
            </div>
        </div>
    }
}
export default Games;