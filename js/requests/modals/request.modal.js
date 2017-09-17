import React from "react";
import Modal from "../../components/modal/modal";

const ReqModal = (props) => {
    return (<Modal target={props.target} onClose={props.onClose}>
        <div className="row">
            <form>
            <div className="col-md-6"></div>
            <div className="col-md-6"></div>
            </form>
        </div>
    </Modal>);
}
export default ReqModal;