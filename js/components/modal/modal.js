import React from "react";
require("../../../css/modal.css");

class Modal extends React.Component{
    render(){
        if(!this.props.target) return null
        return <div className="blackout">
                <div className="custom-modal">
                <div className="custom-modal-dialog">
                    <div className="custom-modal-content">
                        <div className="custom-modal-header"><i className="fa fa-lg fa-times" onClick={this.props.onClose}></i></div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>
    }
}
export default Modal;