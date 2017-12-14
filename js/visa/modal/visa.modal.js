import React from "react";
import Modal from "../../components/modal/modal";
import moment from "moment";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";

const VisaModal = (props) => {
    if(!props.visa) return null;
    var visa = props.visa;
    var types = [{id: "0", text: "Шенгенська віза"}, {id: "1", text: "Віза США"}];
    var typesList = types.map(x => <option key={x.id} value={x.id}>{x.text}</option>);
    var expireDate = moment(new Date(visa.expires)).format("DD-MM-YYYY");
    var personsList = (visa.persons)? visa.persons.map(x => <option key={x.id + " " + x.role} value={x.id + " " + x.role}>{x.fullName}</option>) : [];
    return(<Modal target={props.visa} onClose={props.onClose}>
        <h3>{"Редагувати дані візи"}</h3>
        <form>
            <div className="form-group">
                <label>Прізвище, Ім'я</label>                
                {
                    (personsList.length > 0) ? 
                    <select className="form-control" value={visa.defaultPerson} onChange={e => props.onSelectOwner(e.target.value)}>
                        <option></option>
                        {personsList}
                    </select> : 
                    <input type="text" value={visa.fullName} className="form-control" readOnly={true} /> 
                }
            </div>
            {}
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
                {
                    (!!visa.id)?
                        <button type="button" className="btn btn-primary footer-update-button" onClick={() => props.onUpdate()}>Оновити</button> :
                    <button type="button" className="btn btn-primary footer-update-button" disabled={!visa.defaultPerson.length} onClick={() => props.onInsert()}>Додати</button>
                }                
                <button type="button" className="btn btn-default" onClick={() => props.onClose()}>Скасувати</button>  
            </div>
        </form>
    </Modal>);
}
export default VisaModal;