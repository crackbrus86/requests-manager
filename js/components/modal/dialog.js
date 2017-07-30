import React from "react";
require("../../../css/dialog.css");

class Dialog extends React.Component{
    render(){
        if(!this.props.dialog) return null;
        return <div className="blackout">
            <div className="dialog">
                <div className="dialog-header">
                    <div className="icons">
                        <i className="fa fa-lg fa-times" onClick={this.props.onClose}></i>
                    </div>
                    <h4>Підтвердіть ваші дії</h4>
                </div>
                <div className="dialog-body">
                    {this.props.dialog.text}
                </div>
                <div className="dialog-footer form-inline">
                    <button type="button" className="btn btn-success" onClick={this.props.onConfirm}>Так</button>
                    <button type="button" className="btn btn-danger"  onClick={this.props.onClose}>Ні</button>
                </div>            
            </div>
        </div>
    }
}
export default Dialog;