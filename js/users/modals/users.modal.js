import React from "react";
import Modal from "../../components/modal/modal";
import moment from "moment";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";

const UserModal = (props) => {
    if(!props.user) return null;
    var user = props.user;
    var fullName = user.lastName + " " + user.firstName + " " + user.mName;
    var born = moment(new Date(user.born)).format("DD-MM-YYYY");
    var regionsList = props.regions.map(r => <option key={r.id} value={r.id}>{r.region}</option>);
    return (<Modal target={props.user} onClose={props.onClose}>
        <h3>{"Редагувати дані спортсмена"}</h3>
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
                    <select value={user.region} className="form-control" onChange={e => props.onChange("region", e.target.value) }>{regionsList}</select>
                </div>
            </div>
            <div className="col-md-6"></div>
        </div>
    </Modal>);
}
export default UserModal;