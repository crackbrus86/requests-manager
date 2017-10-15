import React from "react";
import Modal from "../../components/modal/modal";
import moment from "moment";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";

const VisaModal = (props) => {
    if(!props.visa) return null;
    var visa = props.visa;
    var fullName = visa.surname + " " + visa.name;
    var types = [{id: "0", text: "Шенгенська віза"}, {id: "1", text: "Віза США"}];
    var typesList = types.map(x => <option key={x.id} value={x.id}>{x.text}</option>);
    var expireDate = moment(new Date(visa.expires)).format("DD-MM-YYYY");
    return(<Modal target={props.visa} onClose={props.onClose}>
        <h3>{"Редагувати дані візи"}</h3>
        <form>
            <div className="form-group">
                <label>Прізвище, Ім'я</label>
                <input type="text" value={fullName} className="form-control" readOnly={true} /> 
            </div>
            <div className="form-group">
                <label>Тип візи</label>
                <select value={visa.type} className="form-control" onChange={e => props.onChange("type", e.target.value)}>
                    {typesList}
                </select>
            </div>
            <div className="form-group">
                <label>Термін дії</label>
                <Datetime value={expireDate} dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true} maxLength="10" onChange={(v) => props.onChange("expires", v.format("YYYY-MM-DD"))} />
            </div>
            <div className="form-group text-right">
                <button type="button" className="btn btn-primary footer-update-button" onClick={() => props.onUpdate()}>Оновити</button>
                <button type="button" className="btn btn-default" onClick={() => props.onClose()}>Скасувати</button>  
            </div>
        </form>
    </Modal>);
}
export default VisaModal;