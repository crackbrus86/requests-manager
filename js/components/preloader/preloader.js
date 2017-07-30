import React from "react";
require("../../../css/preloader.css");

class Preloader extends React.Component{
    render(){
        if(!this.props.loading) return null;
        return <div className="blackout">
            <div className="spinner-wrap"><i className="fa-spin fa fa-circle-o-notch fa-5x"></i></div>
        </div>
    }
}
export default Preloader;