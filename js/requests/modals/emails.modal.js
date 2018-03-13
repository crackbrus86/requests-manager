import React from "react";
import Modal from "../../components/modal/modal";

const EmailsModal = (props) => {
    if(!props.emails.length) return null;
    return ( <Modal target={props.emails} onClose={props.onClose}>
        <h3>{"Експорт поштових адрес"}</h3>
        <form>
            <div className="form-group">
                <label>Email адреси учасників</label>
                <textarea className="form-control" value={ props.emails.join(', ') } readOnly={true} />
            </div>
        </form>
    </Modal>);
}
export default EmailsModal;