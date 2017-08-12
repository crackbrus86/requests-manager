import React from "react";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";
import * as validation from "../../components/validation/validation";

const VisaForm = (props) => {
    if(props.visa.hasVisa === "false") return null;
    var types = [{id: 0, title: "Шенгенська віза"}, {id: 1, title: "Віза США"}];
    var typesList = types.map(type => <option key={type.id} value={type.id}>{type.title}</option>);
    var visaExp = (props.visa.term)? new Date(props.visa.term) : null;
    return (<div>
        <div className="form-group">
            <label>Тип діючої візи</label>
            <select value={props.visa.type} className="form-control" onChange={e => props.onChange("type", e.target.value, "visa")}>{typesList}</select>
        </div>
        <div className="form-group">
            <label>Термін дії візи {validation.isFieldValid(visaExp, "Це поле є обов'язковим")}</label>
            <Datetime value={visaExp} dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true} maxLength="10" onChange={(v) => props.onChange("term", v.format("YYYY-MM-DD"), "visa")} />
        </div>
    </div>);
}

export default VisaForm;