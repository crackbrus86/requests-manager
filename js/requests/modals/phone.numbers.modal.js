import React from "react";
import Modal from "../../components/modal/modal";

const PhoneNumbersModal = (props) => {
    if(!props.numbers.length) return null;
    return <Modal target={props.numbers} onClose={props.onClose}>
        <h3>Експорт мобільних номерів</h3>
        <form>
            <div className="form-group">
                <label>Мобільні номери учасників</label>
                <textarea className="form-control" rows={5} value={props.numbers.join(', ')} readOnly={true} />
            </div>
        </form>
    </Modal>
}

export default PhoneNumbersModal;