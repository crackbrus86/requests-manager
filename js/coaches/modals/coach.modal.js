import React from "react";
import Modal from "../../components/modal/modal";

const CoachModal = (props) => {
    if(!props.coach) return null;
    return(<Modal target={props.coach} onClose={props.onClose}>
        <h3>{"Редагувати дані тренера"}</h3>
    </Modal>);
}
export default CoachModal;