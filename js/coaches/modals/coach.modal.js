import React from "react";
import Modal from "../../components/modal/modal";
import moment from "moment";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";

const CoachModal = (props) => {
    if(!props.coach) return null;
    jQuery(".phone").mask("+38 (999) 999-99-99");
    var coach = props.coach;
    var fullName = coach.surname + " " + coach.name + " " + coach.mName;
    var born = moment(new Date(coach.born)).format("DD-MM-YYYY");
    var regionsList = props.regions.map(r => <option key={r.id} value={r.id}>{r.region}</option>);
    return(<Modal target={props.coach} onClose={props.onClose}>
        <h3>{"Редагувати дані тренера"}</h3>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>П.І.П.</label>
                    <input type="text" value={fullName} className="form-control" readOnly={true} />
                </div>
                <div className="form-group">
                    <label>Дата народження</label>
                    <input type="text" value={born} className="form-control" readOnly={true} />
                </div>
                <div className="form-group">
                    <label>Область</label>
                    <select value={coach.region} className="form-control" onChange={e => props.onChange("region", e.target.value)}>{regionsList}</select>
                </div>
                <div className="form-group">
                    <label>Прізвище як у закордонному паспорті</label>
                    <input type="text" value={coach.latSurname} className="form-control" onChange={e => props.onChange("latSurname", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Ім'я як у закордонному паспорті</label>
                    <input type="text" value={coach.latFirstName} className="form-control" onChange={e => props.onChange("latFirstName", e.target.value)} />
                </div>
            </div>
            <div className="col-md-6"></div>
        </div>
    </Modal>);
}
export default CoachModal;